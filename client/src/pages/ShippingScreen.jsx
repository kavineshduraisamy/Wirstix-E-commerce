import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <div className="text-center mb-10">
                <h1 className="text-4xl font-sans font-medium text-secondary mb-2">Shipping Details</h1>
                <p className="text-gray-400 font-light text-sm uppercase">Where should we send your timepiece?</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Address</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. 221B Baker Street"
                        className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">City</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. London"
                        className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Postal Code</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. NW1 6XE"
                        className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Country</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. United Kingdom"
                        className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-secondary transition placeholder:text-gray-200"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-primary transition duration-300 shadow-sm">
                        Continue to Payment
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default ShippingScreen;
