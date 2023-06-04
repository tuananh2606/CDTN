const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '2h',
        },
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,
        {
            expiresIn: '7d',
        },
    );
};

exports.registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
        });

        //Save to DB
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json('Wrong email!');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(404).json('Wrong password!');
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                //secure -  Dev: false || Production: true
                secure: true,
                path: '/',
                sameSite: 'None',
            });
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.requestRefreshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newFreshToken = generateRefreshToken(user);
        refreshTokens.push(newFreshToken);
        res.cookie('refreshToken', newFreshToken, {
            httpOnly: true,
            //secure -  Dev: false || Production: true
            secure: true,
            path: '/',
            sameSite: 'none',
        });
        res.status(200).json({ accessToken: newAccessToken });
    });
};
exports.userLogout = async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json('Logged out');
};
