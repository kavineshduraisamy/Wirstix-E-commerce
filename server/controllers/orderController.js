import Order from '../models/orderModel.js';


async function addOrderItems(req, res) {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function updateOrderToPaid(req, res) {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer?.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateOrderToDelivered(req, res) {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getMyOrders(req, res) {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getOrders(req, res) {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};
