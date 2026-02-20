import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useDeliverOrderMutation,
} from '../redux/ordersApiSlice';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

// CheckoutForm Component (Internal)
const CheckoutForm = ({ orderId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [payOrder] = usePayOrderMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order/${orderId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment succeeded!');
            toast.success('Payment succeeded!');
            try {
                await payOrder({ orderId, details: { id: paymentIntent.id, status: paymentIntent.status, update_time: String(Date.now()), payer: { email_address: 'stripe_user@example.com' } } });
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            setMessage('Unexpected state');
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-100">
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="w-full bg-secondary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-primary transition mt-6 shadow-sm disabled:opacity-50"
            >
                <span id="button-text">
                    {isProcessing ? 'Processing... ' : 'Complete Secure Payment'}
                </span>
            </button>
            {message && <div id="payment-message" className="mt-4 text-red-500 text-[11px] font-bold uppercase tracking-wider">{message}</div>}
        </form>
    );
};

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (!order || order.isPaid) return;

        if (!stripePromise) {
            // Fetch publishable key
            axios.get('/api/payment/config').then((res) => {
                setStripePromise(loadStripe(res.data.publishableKey));
            });
        }

        if (!clientSecret && order.totalPrice > 0) {
            // Create PaymentIntent
            axios.post('/api/payment/create-payment-intent', {
                amount: Math.round(order.totalPrice * 100), // cents
            }).then((res) => {
                setClientSecret(res.data.clientSecret);
            }).catch((err) => {
                console.error(err);
                // Handling error (maybe token expired or logic error)
            });
        }
    }, [order, stripePromise, clientSecret, userInfo]);

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
    ) : (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <div className="text-center mb-12">
                <span className="text-[10px] font-bold text-gray-400 uppercase mb-3 block">Order Confirmation</span>
                <h1 className="text-4xl font-sans font-medium text-secondary">#{order._id}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase mb-6">Delivery Information</h2>
                        <div className="text-sm font-light text-secondary space-y-2 border-l-2 border-accent pl-6">
                            <p className="font-medium text-secondary">{order.user?.name}</p>
                            {order.user?.email && (
                                <a href={`mailto:${order.user.email}`} className="block text-gray-400 hover:text-primary transition">{order.user.email}</a>
                            )}
                            <p className="pt-2 text-gray-500">
                                {order.shippingAddress?.address}, {order.shippingAddress?.city}<br />
                                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                            </p>
                        </div>
                        <div className="mt-6">
                            {order.isDelivered ? (
                                <Message variant="success">Dispatched on {order.deliveredAt.substring(0, 10)}</Message>
                            ) : (
                                <Message variant="warning">Status: Processing for dispatch</Message>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase mb-6">Payment Status</h2>
                        <div className="text-sm font-light text-secondary border-l-2 border-accent pl-6 mb-6">
                            <strong>Method: </strong> {order.paymentMethod}
                        </div>
                        {order.isPaid ? (
                            <Message variant="success">Settled on {order.paidAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant="warning">Status: Awaiting Settlement</Message>
                        )}
                    </section>

                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase mb-6">Purchased Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <div className="divide-y divide-gray-50 border-t border-b border-gray-50">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center py-6">
                                        <div className="w-16 h-16 flex-shrink-0 bg-accent rounded-sm overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-6 flex-grow">
                                            <Link to={`/product/${item.product}`} className="text-sm font-medium text-secondary hover:text-primary transition">
                                                {item.name}
                                            </Link>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.qty} Unit{item.qty > 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="text-sm font-bold text-secondary">
                                            ₹{(item.qty * item.price).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-32 bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
                        <h2 className="text-xs font-bold text-secondary uppercase mb-8">Order Summary</h2>

                        <div className="space-y-4 text-sm font-light text-gray-600 mb-8">
                            <div className="flex justify-between">
                                <span>Items Subtotal</span>
                                <span className="text-secondary">₹{order.itemsPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-secondary">₹{order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (GST)</span>
                                <span className="text-secondary">₹{order.taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-50 pt-4 flex justify-between text-base font-bold text-secondary">
                                <span>Grand Total</span>
                                <span>₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        {!order.isPaid && clientSecret && stripePromise && (
                            <div className="mt-8">
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm orderId={order._id} amount={order.totalPrice} />
                                </Elements>
                            </div>
                        )}

                        {loadingDeliver && <Loader />}

                        {userInfo && userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
                            <button
                                type="button"
                                className="w-full bg-primary text-secondary font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary hover:text-white transition duration-300 mt-6 shadow-sm"
                                onClick={deliverOrderHandler}
                            >
                                Mark As Dispatched
                            </button>
                        )}

                        <p className="mt-8 text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                            Order protected by<br />
                            TimeLux Secure Transaction
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
