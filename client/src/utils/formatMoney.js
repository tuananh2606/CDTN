export const VNDFormat = (money) => {
    let VNDFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VNDFormat.format(money);
};
