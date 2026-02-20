import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../redux/ordersApiSlice';
import { clearCartItems } from '../redux/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <CheckoutSteps step1 step2 step3 step4 />

            <h1 className="text-4xl font-accent font-medium text-secondary mb-12 text-center">Final Review</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Shipping Address</h2>
                        <p className="text-sm font-light text-secondary border border-gray-100 p-6 rounded-sm bg-accent/30">
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}<br />
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Payment Selection</h2>
                        <p className="text-sm font-light text-secondary border border-gray-100 p-6 rounded-sm bg-accent/30">
                            {cart.paymentMethod} Gateway
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6">Order Contents</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <div className="divide-y divide-gray-50 border-t border-b border-gray-50">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center py-6">
                                        <div className="w-20 h-20 flex-shrink-0 bg-accent rounded-sm overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-6 flex-grow">
                                            <Link to={`/product/${item._id}`} className="text-sm font-medium text-secondary hover:text-primary transition">
                                                {item.name}
                                            </Link>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.qty} Unit{item.qty > 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="text-sm font-bold text-secondary">
                                            ${(item.qty * item.price).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-32 bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
                        <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-8">Summary</h2>

                        <div className="space-y-4 text-sm font-light text-gray-600 mb-8">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-secondary">${cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-secondary">${cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (GST)</span>
                                <span className="text-secondary">${cart.taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-50 pt-4 flex justify-between text-base font-bold text-secondary">
                                <span>Total Amount</span>
                                <span>${cart.totalPrice}</span>
                            </div>
                        </div>

                        {error && <Message variant="error">{error?.data?.message || error.error}</Message>}

                        <button
                            type="button"
                            className="w-full bg-secondary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-primary transition duration-300 shadow-sm disabled:opacity-50"
                            disabled={cart.cartItems.length === 0 || isLoading}
                            onClick={placeOrderHandler}
                        >
                            {isLoading ? 'Processing...' : 'Place Secure Order'}
                        </button>

                        <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                            By placing this order you agree to our<br />
                            Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
