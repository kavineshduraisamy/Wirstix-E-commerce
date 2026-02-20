import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/productsApiSlice';
import { ArrowLeft } from 'lucide-react';

const ProductCreateScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createProduct({
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('New Timepiece Created');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10 pb-24">
            <Link to="/admin/productlist" className="bg-accent text-secondary px-6 py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-widest hover:bg-gray-200 transition inline-flex items-center mb-10 shadow-sm border border-gray-100">
                <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Inventory
            </Link>

            <FormContainer>
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-accent text-secondary mb-3">Add New Collection Piece</h1>
                    <div className="h-1 w-20 bg-primary mx-auto"></div>
                </div>

                {loadingCreate && <Loader />}

                <form onSubmit={submitHandler} className="space-y-8 bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Model Name</label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium"
                                placeholder="e.g. Speedmaster Professional"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Product Value (INR)</label>
                            <input
                                type="number"
                                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium"
                                placeholder="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Maison / Brand</label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium"
                                placeholder="e.g. Omega"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Boutique Category</label>
                            <select
                                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium bg-white"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Men">Men's Collection</option>
                                <option value="Women">Women's Collection</option>
                                <option value="Smart">Smart Watches</option>
                                <option value="Premium">International Brands</option>
                                <option value="Home">Clocks & Decor</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Stock Allocation</label>
                        <input
                            type="number"
                            className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium"
                            placeholder="0"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Initial Image Asset</label>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-primary transition text-sm text-secondary font-medium"
                                placeholder="URL or select file"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <div className="bg-accent/30 p-4 border border-dashed border-gray-200 rounded-sm">
                                <input
                                    type="file"
                                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary file:text-white hover:file:opacity-90"
                                    onChange={uploadFileHandler}
                                />
                            </div>
                        </div>
                        {loadingUpload && <div className="mt-2"><Loader /></div>}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Heritage / Description</label>
                        <textarea
                            className="w-full border border-gray-100 p-4 focus:outline-none focus:border-primary transition text-sm text-secondary font-light min-h-[150px] leading-relaxed"
                            placeholder="Describe the craftsmanship and history of this piece..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white py-5 rounded-sm font-bold uppercase text-xs tracking-[0.3em] shadow-lg hover:bg-primary transition duration-500">
                        Initialize Marketplace Placement
                    </button>
                </form>
            </FormContainer>
        </div>
    );
};

export default ProductCreateScreen;
