const User = require('../models/userModel');

// ADMIN DASHBOARD

exports.getAllUsers = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 12;

        const users = await User.find()
            .skip((pageNumber - 1) * limit)
            .limit(limit);
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        return res.status(200).json(users);
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
        const user = new User();
        const savedUser = await user.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.updateUser = async (req, res) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            verified: req.body.verified,
            admin: req.body.admin,
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
