import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const productsCount = await Product.countDocuments();
        const usersCount = await User.countDocuments();

        const paidOrders = await Order.find({ isPaid: true });
        const totalRevenue = paidOrders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({
            totalRevenue,
            usersCount,
            productsCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getDashboardStats };
