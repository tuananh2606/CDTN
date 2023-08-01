const { Wishlist } = require('../models/wishlistModel');

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.params.id })
            .populate({
                path: 'product',
                select: { _id: 1, name: 1, code: 1, slug: 1, images: 1, price: 1, category: 1 },
                populate: {
                    path: 'category',
                    select: { _id: 1, slug: 1 },
                },
            })
            .exec();

        return res.status(200).json(wishlist);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const product = new Wishlist({
            product: req.body.product,
            user: req.body.user,
        });
        const savedProduct = await product.save();
        return res.status(200).json(savedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.removeFromWishlist = async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        return res.status(200).json('Delete Successfully!');
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.checkExistInWishlist = async (req, res) => {
    try {
        const productWishlist = await Wishlist.find({ product: req.body.product, user: req.body.user });
        return res.status(200).json({ success: true, product: productWishlist });
    } catch (error) {
        return res.status(500).json(error);
    }
};
