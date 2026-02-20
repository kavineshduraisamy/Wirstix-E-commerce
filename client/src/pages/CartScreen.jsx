import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Trash2 } from 'lucide-react';
import Message from '../components/Message';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <h1 className="text-4xl font-sans font-medium text-secondary mb-12 leading-tight">Your Shopping Bag</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                    {cartItems.length === 0 ? (
                        <div className="bg-accent p-12 text-center rounded-sm">
                            <p className="text-gray-500 font-light mb-6">Your bag is currently empty.</p>
                            <Link to="/" className="btn-outline inline-block">Continue Shopping</Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex flex-col sm:flex-row items-start justify-between border-b border-gray-100 pb-8 space-y-4 sm:space-y-0">
                                    <div className="flex space-x-6 w-full">
                                        <div className="bg-accent w-24 h-32 flex-shrink-0 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col flex-grow">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{item.brand || 'Luxury'}</p>
                                            <Link to={`/product/${item._id}`} className="text-lg font-medium text-secondary hover:text-primary transition mb-2">{item.name}</Link>
                                            <div className="mt-auto flex items-center space-x-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Quantity</span>
                                                    <select
                                                        className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 cursor-pointer"
                                                        value={item.qty}
                                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    className="text-gray-400 hover:text-red-500 transition self-end pb-0.5"
                                                    onClick={() => removeFromCartHandler(item._id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right w-full sm:w-auto">
                                        <p className="text-xl font-light text-secondary">₹{(item.price * item.qty).toLocaleString()}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">₹{item.price} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-accent p-8 rounded-sm sticky top-24">
                        <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-8 border-b border-gray-200 pb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="font-light text-gray-600">Total Items:</span>
                                <span className="font-bold text-secondary">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                            </div>
                            <div className="flex justify-between text-lg border-t border-gray-200 pt-4">
                                <span className="font-sans font-medium">Subtotal</span>
                                <span className="font-bold text-secondary">
                                    ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition duration-300 shadow-sm ${cartItems.length === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:opacity-90'
                                }`}
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Checkout Now
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                                Shipping & taxes calculated at checkout. <br />
                                Complementary luxury packaging included.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;
