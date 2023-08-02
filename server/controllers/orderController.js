const Order = require('../models/orderModel');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const dayjs = require('dayjs');
const querystring = require('qs');
const crypto = require('crypto');
const hmacSHA512 = require('crypto-js/hmac-sha512');

exports.getAllOrders = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let perPage = parseInt(req.query.limit) || 10;
        const orders = await Order.find()
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage);
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getOrderByOrderId = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id }).populate('user').exec();
        console.log(order);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').exec();
        console.log(order);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getOrderByUser = async (req, res) => {
    try {
        const order = await Order.find({ user: req.params.id }).populate('user');
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { orderId, shippingInfo, orderItems, paymentMethod, totalPrice, user } = req.body;

        const newOrder = {
            orderId,
            shippingInfo,
            orderItems,
            user,
            paymentInfo: { paymentMethod },
            totalPrice,
        };
        const order = new Order(newOrder);
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const newOrderData = {
            orderStatus: req.body.orderStatus,
        };
        await Order.findByIdAndUpdate(req.params.id, newOrderData, { new: true, runValidators: true });
        return res.status(200).json({ success: 'Update Successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateOrderStatusVnPay = async (req, res) => {
    try {
        const order = await Order.find({
            orderId: req.params.orderId,
        });
        if (order) {
            const filter = { orderId: req.params.orderId };
            await Order.findOneAndUpdate(
                filter,
                {
                    paymentInfo: {
                        paymentMethod: 'ttqvnp',
                        status: true,
                    },
                },
                { new: true },
            );
        }
        return res.status(200).json({ success: 'Update Successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json('Delete Successfully!');
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.createPaymentVnPay = async (req, res) => {
    let obj = await import('open');
    let open = obj.default;
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = dayjs(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let tmnCode = process.env.tmnCode;
    let secretKey = process.env.secretKey;
    let vnpUrl = process.env.vnpUrl;
    let returnUrl = process.env.returnUrl;
    let orderId = req.body.orderId;
    let amount = req.body.totalPrice;
    // let bankCode = req.body.bankCode;
    let locale = 'vn';
    // let locale = req.body.language;
    // if (locale === null || locale === '') {
    //     locale = 'vn';
    // }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    // if (bankCode !== null && bankCode !== '') {
    //     vnp_Params['vnp_BankCode'] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    // open(vnpUrl);
    return res.status(200).send(vnpUrl);
    // res.redirect(301, vnpUrl);
};

exports.vnPayReturn = async (req, res) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
    } else {
        res.render('success', { code: '97' });
    }
};

exports.vnpayIpn = async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = config.get('vnp_HashSecret');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
        //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == '0') {
                    //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if (rspCode == '00') {
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    } else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({ RspCode: '00', Message: 'Success' });
                    }
                } else {
                    res.status(200).json({
                        RspCode: '02',
                        Message: 'This order has been updated to the payment status',
                    });
                }
            } else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
            }
        } else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
