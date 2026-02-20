import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

import { X } from 'lucide-react';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        // Force clear inputs on mount to prevent browser autofill after logout
        setEmail('');
        setPassword('');
    }, []);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <div className="text-center mb-12">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">Maison TimeLux</span>
                <h1 className="text-4xl font-accent font-medium text-secondary mb-3 italic">Welcome Back</h1>
                <p className="text-gray-400 font-light text-[11px] uppercase tracking-widest">Sign in to your account</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-8" autoComplete="off">
                <div className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            placeholder="e.g. james.bond@time.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-accent/30 border border-gray-100 rounded-sm py-3.5 px-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
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

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-4 rounded-sm uppercase tracking-[0.2em] text-[11px] hover:opacity-95 transition-all duration-300 shadow-sm disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </div>
                {isLoading && <Loader />}
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm">
                <span className="text-gray-500 font-light italic">New to TimeLux?</span>{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-bold hover:underline ml-1">
                    Create an Account
                </Link>
            </div>
        </FormContainer>
    );
};

export default LoginScreen;
