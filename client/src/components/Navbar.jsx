import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/usersApiSlice';
import { logout } from '../redux/authSlice';
import { ShoppingCart, User, LogOut, Menu, X, Watch } from 'lucide-react';
import SearchBox from './SearchBox';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
            setDropdownOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="bg-white text-secondary border-b border-gray-100 shadow-sm sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-[#000000] text-[#f2f2f2] text-[10px] py-1.5 text-center font-medium">
                GET THE BEST LUXURY WATCHES AT TIMELUX
            </div>

            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-1">
                            <span className="text-3xl font-accent font-black text-secondary uppercase">TimeLux</span>
                        </Link>
                    </div>

                    <SearchBox />

                    {/* Navigation Links (Center) */}
                    <div className="hidden lg:flex items-center justify-center space-x-10 flex-grow px-10 uppercase text-[13px] font-semibold">
                        <Link to="/shop?category=Men" className="hover:text-primary transition py-2 border-b-2 border-transparent hover:border-primary">Men</Link>
                        <Link to="/shop?category=Women" className="hover:text-primary transition py-2 border-b-2 border-transparent hover:border-primary">Women</Link>
                        <Link to="/shop?category=Smart" className="hover:text-primary transition py-2 border-b-2 border-transparent hover:border-primary">Smart Watches</Link>
                        <Link to="/shop?category=Premium" className="hover:text-primary transition py-2 border-b-2 border-transparent hover:border-primary">Premium</Link>
                    </div>

                    {/* Icons (Right) */}
                    <div className="flex items-center space-x-8">
                        {userInfo ? (
                            <div className="relative group">
                                <button
                                    className="flex flex-col items-center hover:text-primary transition focus:outline-none"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <User className="h-5 w-5 mb-0.5" strokeWidth={1.5} />
                                    <span className="text-[10px] font-medium uppercase tracking-tight hidden sm:block">Account</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-sm shadow-xl py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-xs text-gray-400">Welcome,</p>
                                            <p className="text-sm font-bold truncate">{userInfo.name}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                                        {userInfo.role === 'admin' && (
                                            <>
                                                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary" onClick={() => setDropdownOpen(false)}>Admin Panel</Link>
                                            </>
                                        )}
                                        <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary border-t border-gray-50 mt-1">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex flex-col items-center hover:text-primary transition">
                                <User className="h-5 w-5 mb-0.5" strokeWidth={1.5} />
                                <span className="text-[10px] font-medium uppercase tracking-tight hidden sm:block">Account</span>
                            </Link>
                        )}

                        <Link to="/cart" className="relative flex flex-col items-center hover:text-primary transition">
                            <ShoppingCart className="h-5 w-5 mb-0.5" strokeWidth={1.5} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            )}
                            <span className="text-[10px] font-medium uppercase tracking-tight hidden sm:block">Cart</span>
                        </Link>

                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-secondary focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 border-b border-gray-100">
                    <div className="px-4 py-6 space-y-4">
                        <Link to="/" className="block text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Men</Link>
                        <Link to="/shop" className="block text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Women</Link>
                        <Link to="/shop?category=Smart" className="block text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>Smart Watches</Link>
                        <Link to="/shop?category=Premium" className="block text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>International Brands</Link>
                        <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                            <Link to="/cart" className="text-sm font-semibold uppercase" onClick={() => setIsOpen(false)}>Cart ({cartItems.length})</Link>
                            {userInfo ? (
                                <Link to="/profile" className="text-sm font-semibold uppercase" onClick={() => setIsOpen(false)}>Profile</Link>
                            ) : (
                                <Link to="/login" className="text-sm font-semibold uppercase" onClick={() => setIsOpen(false)}>Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
