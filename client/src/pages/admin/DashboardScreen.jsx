import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Package } from 'lucide-react';

import Loading from '../../components/Loader';
import Message from '../../components/Message';
import { useGetDashboardStatsQuery } from '../../redux/productsApiSlice';

const DashboardScreen = () => {
    const { data: statsData, isLoading, error } = useGetDashboardStatsQuery();

    const stats = [
        {
            label: 'Revenue Generated',
            value: statsData ? `₹${statsData.totalRevenue.toLocaleString()}` : '₹0',
            icon: <ShoppingBag className="w-6 h-6 text-secondary" />,
            link: '/admin/orderlist',
            unit: 'INR'
        },
        {
            label: 'Active Clientele',
            value: statsData ? statsData.usersCount.toString() : '0',
            icon: <Users className="w-6 h-6 text-secondary" />,
            link: '/admin/userlist',
            unit: 'Members'
        },
        {
            label: 'Boutique Inventory',
            value: statsData ? statsData.productsCount.toString() : '0',
            icon: <Package className="w-6 h-6 text-secondary" />,
            link: '/admin/productlist',
            unit: 'SKUs'
        },
    ];

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <div className="mb-12">
                <span className="text-[10px] font-bold text-gray-400 uppercase mb-3 block">Boutique Management</span>
                <h1 className="text-4xl font-sans font-medium text-secondary">Command Center</h1>
            </div>

            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <Link to={stat.link} key={index} className="group bg-white p-8 border border-gray-100 rounded-sm hover:border-secondary transition-all duration-500 flex flex-col justify-between h-48 lg:h-56">
                            <div className="flex justify-between items-start">
                                <div className="bg-accent p-3 rounded-sm group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
                                    {stat.icon}
                                </div>
                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{stat.unit}</span>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">{stat.label}</p>
                                <p className="text-4xl font-sans font-medium text-secondary leading-none">{stat.value}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <section>
                <div className="flex justify-between items-end border-b border-gray-50 pb-6 mb-8">
                    <div>
                        <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-1">Operational Flow</h2>
                        <p className="text-[13px] font-light text-gray-400">Expedite your boutique's daily management</p>
                    </div>
                    <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
                        <Link to="/admin/productlist" className="text-primary hover:text-secondary transition-colors border-b border-transparent hover:border-secondary pb-1">Inventory Control</Link>
                        <Link to="/admin/orderlist" className="text-primary hover:text-secondary transition-colors border-b border-transparent hover:border-secondary pb-1">Order Logistics</Link>
                        <Link to="/admin/userlist" className="text-primary hover:text-secondary transition-colors border-b border-transparent hover:border-secondary pb-1">Patron Directory</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-accent/30 p-10 rounded-sm border border-gray-50 flex flex-col justify-center">
                        <h3 className="text-2xl font-sans font-medium text-secondary mb-4">Refine the Collection</h3>
                        <p className="text-sm font-light text-gray-500 mb-8 leading-relaxed">Ensure every timepiece is presented with the elegance it deserves. Update pricing, imagery, and specifications.</p>
                        <Link to="/admin/productlist" className="w-fit bg-secondary text-white font-bold py-4 px-10 rounded-sm uppercase text-[10px] hover:bg-primary transition shadow-sm">
                            Access Inventory
                        </Link>
                    </div>

                    <div className="bg-secondary p-10 rounded-sm flex flex-col justify-center">
                        <h3 className="text-2xl font-sans font-medium text-white mb-4">Logistical Overview</h3>
                        <p className="text-sm font-light text-gray-300 mb-8 leading-relaxed">Monitor pending shipments and ensure prompt delivery of luxury to your patrons worldwide.</p>
                        <Link to="/admin/orderlist" className="w-fit bg-white text-secondary font-bold py-4 px-10 rounded-sm uppercase text-[10px] hover:bg-primary hover:text-white transition shadow-sm">
                            View Logistics
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardScreen;
