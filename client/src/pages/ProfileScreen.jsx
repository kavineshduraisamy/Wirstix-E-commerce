import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import { useGetMyOrdersQuery } from '../redux/ordersApiSlice';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <h1 className="text-4xl font-sans font-medium text-secondary mb-12 leading-tight">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4 lg:border-r border-gray-100 lg:pr-12">
                    <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-8">Personal Details</h2>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">New Password (Optional)</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-primary transition duration-300 shadow-sm disabled:opacity-50" disabled={loadingUpdateProfile}>
                                {loadingUpdateProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-8">
                    <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-8">Purchase History</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="error">
                            {errorOrders?.data?.message || errorOrders.error}
                        </Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID</th>
                                        <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                        <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                                        <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-[13px]">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="group hover:bg-accent transition-colors">
                                            <td className="py-6 font-mono text-[11px] text-gray-500">{order._id}</td>
                                            <td className="py-6 font-light text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                            <td className="py-6 font-medium text-secondary">${order.totalPrice.toLocaleString()}</td>
                                            <td className="py-6">
                                                <div className="flex flex-col space-y-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${order.isPaid ? 'text-green-600' : 'text-red-400'}`}>
                                                        {order.isPaid ? `Paid` : 'Awaiting Payment'}
                                                    </span>
                                                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${order.isDelivered ? 'text-blue-600' : 'text-orange-400'}`}>
                                                        {order.isDelivered ? `Delivered` : 'Processing'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-right">
                                                <Link to={`/order/${order._id}`} className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary border-b border-transparent hover:border-primary pb-0.5 transition-all">
                                                    View Order
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center text-gray-400 font-light italic">
                                                You haven't made any purchases yet. Your future timepieces will appear here.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
