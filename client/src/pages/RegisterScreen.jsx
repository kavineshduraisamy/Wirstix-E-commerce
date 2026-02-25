import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

import { X } from 'lucide-react';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        // Ensure form is clear on mount
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }, []);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <div className="text-center mb-12">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">Maison Wristix</span>
                <h1 className="text-4xl font-accent font-medium text-secondary mb-3 italic">Create Account</h1>
                <p className="text-gray-400 font-light text-[11px] uppercase tracking-widest">Experience luxury timepieces</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6" autoComplete="off">
                <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5" htmlFor="name">
                        Full Name
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            placeholder="What should we call you?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                        />
                        {name && (
                            <button
                                type="button"
                                onClick={() => setName('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-secondary p-1"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                        />
                        {email && (
                            <button
                                type="button"
                                onClick={() => setEmail('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-secondary p-1"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5" htmlFor="password">
                        Password
                    </label>
                    <div className="relative group">
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                        />
                        {password && (
                            <button
                                type="button"
                                onClick={() => setPassword('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-secondary p-1"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="relative group">
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                        />
                        {confirmPassword && (
                            <button
                                type="button"
                                onClick={() => setConfirmPassword('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-secondary p-1"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-4 rounded-sm uppercase tracking-[0.2em] text-[11px] hover:opacity-95 transition-all duration-300 shadow-sm disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
                {isLoading && <Loader />}
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm">
                <span className="text-gray-500 font-light italic">Already have an account?</span>{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-bold hover:underline ml-1">
                    Sign In
                </Link>
            </div>
        </FormContainer>
    );
};

export default RegisterScreen;
