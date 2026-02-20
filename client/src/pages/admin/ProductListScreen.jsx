import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../redux/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const navigate = useNavigate();

    const { data, isLoading, error, refetch } = useGetProductsQuery({
        keyword: '',
        pageNumber: 1,
    });

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                refetch();
                toast.success('Product removed');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-accent text-primary">Boutique Inventory</h1>
                <Link
                    to="/admin/product/create"
                    className="bg-primary text-white px-6 py-2.5 rounded-sm font-bold uppercase text-[11px] tracking-widest hover:opacity-90 transition flex items-center shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New Timepiece
                </Link>
            </div>

            {loadingDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error?.data?.message || error.error}</Message>
            ) : (
                <div className="overflow-x-auto bg-white rounded-sm shadow-sm border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-accent/50 text-secondary">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">ID</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Model Name</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Value (₹)</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Maison</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.products.map((product) => (
                                <tr key={product._id} className="hover:bg-accent/20 transition-colors">
                                    <td className="px-6 py-5 text-xs text-gray-500 font-medium font-sans">#{product._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-secondary">{product.name}</td>
                                    <td className="px-6 py-5 text-sm font-medium text-secondary">₹{product.price?.toLocaleString()}</td>
                                    <td className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</td>
                                    <td className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</td>
                                    <td className="px-6 py-5 text-right space-x-4">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-gray-400 hover:text-primary transition inline-block">
                                            <Edit size={18} strokeWidth={1.5} />
                                        </Link>
                                        <button onClick={() => deleteHandler(product._id)} className="text-gray-400 hover:text-red-500 transition inline-block">
                                            <Trash2 size={18} strokeWidth={1.5} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListScreen;
