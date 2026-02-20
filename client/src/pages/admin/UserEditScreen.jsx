import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/usersApiSlice';
import { ArrowLeft, User, ShieldCheck, Mail, Fingerprint } from 'lucide-react';

const UserEditScreen = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Only role is editable by admin now
            await updateUser({ userId, role }).unwrap();
            toast.success('User access updated');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const roles = [
        {
            id: 'user',
            title: 'User',
            description: 'Standard customer access. Can place orders and view profile.',
            icon: <User className="w-6 h-6" />,
        },
        {
            id: 'admin',
            title: 'Administrator',
            description: 'Full system access. Manage products, orders, and users.',
            icon: <ShieldCheck className="w-6 h-6" />,
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <Link to="/admin/userlist" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8 group font-accent text-sm tracking-wide">
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Directory
                </Link>

                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-secondary p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck className="w-24 h-24" />
                        </div>
                        <h1 className="text-2xl font-accent font-bold tracking-tight">Access Control</h1>
                        <p className="text-gray-400 mt-1 font-sans text-sm">Managing authorization levels for TimeLux members</p>
                    </div>

                    <div className="p-8 md:p-12">
                        {loadingUpdate && <Loader />}
                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="error">{error?.data?.message || error.error}</Message>
                        ) : (
                            <form onSubmit={submitHandler} className="space-y-10">
                                {/* Non-Editable User Info */}
                                <div className="grid grid-cols-1 gap-6 p-6 bg-accent/30 rounded-2xl border border-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <Fingerprint className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Identified As</p>
                                            <p className="text-secondary font-bold font-sans">{name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Digital Identity</p>
                                            <p className="text-secondary/70 font-sans">{email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Editable Role Selection */}
                                <div>
                                    <label className="block text-secondary text-[11px] font-bold mb-6 uppercase tracking-[0.2em] flex items-center">
                                        <span className="mr-3">Assign Authority Level</span>
                                        <div className="h-[1px] flex-grow bg-gray-100"></div>
                                    </label>

                                    <div className="grid grid-cols-1 gap-4">
                                        {roles.map((r) => (
                                            <div
                                                key={r.id}
                                                onClick={() => setRole(r.id)}
                                                className={`cursor-pointer group relative rounded-2xl p-5 border-2 transition-all duration-300 flex items-center space-x-5 ${role === r.id
                                                        ? 'border-primary bg-primary/[0.02] shadow-sm ring-1 ring-primary/10'
                                                        : 'border-transparent bg-gray-50 hover:bg-gray-100 opacity-60 hover:opacity-100'
                                                    }`}
                                            >
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${role === r.id
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                        : 'bg-white text-gray-400'
                                                    }`}>
                                                    {r.icon}
                                                </div>
                                                <div className="flex-grow text-left">
                                                    <h3 className={`text-base font-bold font-accent ${role === r.id ? 'text-primary' : 'text-gray-700'}`}>
                                                        {r.title}
                                                    </h3>
                                                    <p className="text-xs font-sans text-gray-500 mt-1 leading-relaxed">{r.description}</p>
                                                </div>
                                                {role === r.id && (
                                                    <div className="bg-primary text-white rounded-full p-1.5 shadow-md">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-secondary hover:bg-black text-white font-bold py-5 px-6 rounded-2xl font-accent transition-all duration-300 transform hover:translate-y-[-2px] shadow-xl hover:shadow-gray-300/50 active:translate-y-0"
                                    >
                                        Update Authorization
                                    </button>
                                    <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-[0.25em]">Admin override • System audit logging enabled</p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditScreen;
