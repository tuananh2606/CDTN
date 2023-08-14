const { User, validate } = require('../models/userModel');

const bcrypt = require('bcrypt');
// ADMIN DASHBOARD

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        const totalDocuments = await User.find().countDocuments();

        const newUsers = { users: users, count: totalDocuments };
        return res.status(200).json(newUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const users = await User.find(
            {
                $text: {
                    $search: searchQuery,
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                },
            },
            { score: { $meta: 'textScore' } },
        )
            .collation({ locale: 'en_US', strength: 1 })
            .limit(10)
            .sort({ score: { $meta: 'textScore' } });
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.searchUserRegex = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const users = await User.find({
            $or: [
                { firstName: { $regex: searchQuery, $options: 'i' } },
                { lastName: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
            ],
        }).limit(10);

        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};
// exports.getAllUsers = async (req, res) => {
//     try {
//         const pageNumber = parseInt(req.query.page);
//         const limit = parseInt(req.query.limit) || 12;

//         const users = await User.find()
//             .skip((pageNumber - 1) * limit)
//             .limit(limit);
//         res.status(200).json(users);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json('Delete Successfully!');
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(409).send('Email đã tồn tại');
        }
        //Create new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashed,
            admin: req.body.isAdmin,
        });
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.updateUser = async (req, res) => {
    try {
        const newUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.isAdmin,
        };
        await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        });
        return res.status(200).json({ newUserData, success: 'Update Successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.editProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {
            $set: { firstName: req.body.firstName, lastName: req.body.lastName },
        });
        await user.save();
        return res.status(200).send('Profile update sucessfully.');
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        console.log(user);
        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPassword) {
            return res.status(401).send('Wrong password');
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashed;
        await user.save();
        return res.status(200).send('password change sucessfully.');
    } catch (error) {
        return res.status(500).json(error);
    }
};
