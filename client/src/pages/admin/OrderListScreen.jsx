import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../redux/ordersApiSlice';

const OrderListScreen = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            <h1 className="text-3xl font-accent text-primary mb-6">Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error?.data?.message || error.error}</Message>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USER</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TOTAL</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PAID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DELIVERED</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order._id}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.user && order.user.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${order.totalPrice}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <span className="text-red-600 font-bold">Not Paid</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <span className="text-red-600 font-bold">Not Delivered</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <Link to={`/order/${order._id}`} className="btn-outline text-xs px-2 py-1">
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default OrderListScreen;
