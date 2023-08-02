const { User, validate } = require('../models/userModel');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { OAuth2Client } = require('google-auth-library');
const { sendEmail } = require('../utils/sendEmail');

const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');

var refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '1h',
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

exports.checkUserExists = async (req, res) => {
    console.log(req.body.email);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).send('Email already exists');
        } else {
            return res.status(200).send(`Email doesn't exists`);
        }
    } catch {
        return res.status(500).send(error);
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        //Create new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashed,
        });

        //Save to DB
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
};
exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send('Wrong email or password');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send('Wrong email or password');
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                //secure -  Dev: false || Production: true
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                // path: '/',
            });
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.requestRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
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
            Path: '/',
            sameSite: 'none',
        });
        res.status(200).json({ accessToken: newAccessToken });
    });
};
exports.userloginWithGoogle = async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    if (tokens.id_token) {
        const response = await oAuth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.CLIENT_ID,
        });
        const payload = response.getPayload();
        const { email_verified, email, name, picture, sub } = payload;
        let password = email + process.env.CLIENT_ID;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        try {
            if (email_verified) {
                const user = await User.findOne({ googleId: sub });
                if (user) {
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
                } else {
                    let newUser = new User({ googleId: sub, name: name, email: email, password: hashed });
                    const user = await newUser.save();
                    return res.json(user);
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

exports.userLogout = async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json('Logged out');
};

exports.sendEmailResetPassword = async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: uuidv4(),
            }).save();
        }

        const link = `${process.env.BASE_CLIENT_URL}/reset-your-password/${user._id}?token=${token.token}`;
        await sendEmail(user.email, 'Password reset', link, 'resetPassword', user.firstName);

        res.send('password reset link sent to your email account');
    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
};

exports.passwordReset = async (req, res) => {
    try {
        const schema = Joi.object({
            password: Joi.string()
                .pattern(
                    new RegExp(
                        '(?=[A-Za-z0-9!#$&()*+,-.:;<=>?%@[^_{|}~]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$&()*+,-.:;<=>%?@[^_{|}~])(?=.{8,}).*$',
                    ),
                )
                .required()
                .min(8)
                .max(20),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send('Invalid link or expired');

        const token = await Token.findOne({
            userId: user._id,
            token: req.query.token,
        });
        if (!token) return res.status(400).send('Invalid link or expired');

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        user.password = hashed;
        await user.save();
        await token.deleteOne();

        res.send('password reset sucessfully.');
    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
};
