import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <div className="text-center mb-10">
                <h1 className="text-4xl font-sans font-medium text-secondary">Secure Settlement</h1>
                <p className="text-gray-400 font-light text-sm uppercase">Select your preferred gateway</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-8">
                <div className="space-y-4">
                    {/* Stripe */}
                    <div className={`flex items-center p-4 border rounded-sm transition cursor-pointer ${paymentMethod === 'Stripe' ? 'border-secondary bg-accent' : 'border-gray-100 hover:border-gray-200'}`} onClick={() => setPaymentMethod('Stripe')}>
                        <input
                            type="radio"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked={paymentMethod === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                        />
                        <label htmlFor="Stripe" className="ml-4 text-sm font-medium text-secondary cursor-pointer">
                            Stripe / Credit Card
                        </label>
                    </div>

                    {/* Razorpay */}
                    <div className={`flex items-center p-4 border rounded-sm transition cursor-pointer ${paymentMethod === 'Razorpay' ? 'border-secondary bg-accent' : 'border-gray-100 hover:border-gray-200'}`} onClick={() => setPaymentMethod('Razorpay')}>
                        <input
                            type="radio"
                            id="Razorpay"
                            name="paymentMethod"
                            value="Razorpay"
                            checked={paymentMethod === 'Razorpay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary"
                        />
                        <label htmlFor="Razorpay" className="ml-4 text-sm font-medium text-secondary cursor-pointer">
                            Razorpay
                        </label>
                    </div>
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-primary transition duration-300 shadow-sm">
                        Review Order
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default PaymentScreen;
