import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import CategoryCarousel from '../components/CategoryCarousel';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';

const ShopScreen = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const keyword = searchParams.get('keyword') || '';

    const { data, isLoading, error } = useGetProductsQuery({
        keyword,
        pageNumber: 1,
        category: category
    });

    return (
        <div className="pb-20">
            <Helmet>
                <title>{category ? `${category} | TimeLux` : 'Shop | TimeLux'}</title>
            </Helmet>

            <CategoryCarousel category={category} />

            <div className="container mx-auto px-4 lg:px-12 mt-16">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase mb-12">
                    <Link to="/" className="hover:text-primary transition">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-secondary">{category || 'All Products'}</span>
                </div>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <>
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h1 className="text-4xl font-accent font-medium text-secondary">
                                    {category || 'Curated Collection'}
                                </h1>
                                <p className="text-xs text-gray-400 font-light mt-2 uppercase">
                                    {data?.products?.length || 0} Exquisite Timepieces
                                </p>
                            </div>
                        </div>

                        {data.products.length === 0 ? (
                            <div className="py-20 text-center bg-accent/30 rounded-sm">
                                <p className="text-gray-500 font-light">Currently, no timepieces are available in this boutique.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                                {data.products.map((product) => (
                                    <div key={product._id} className="group flex flex-col">
                                        <Link to={`/product/${product._id}`} className="relative overflow-hidden bg-accent aspect-[4/5] mb-6 block">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                                        </Link>

                                        <div className="flex-grow flex flex-col space-y-2">
                                            <p className="text-[10px] uppercase text-gray-400 font-bold">{product.brand || 'Luxury Watch'}</p>
                                            <Link to={`/product/${product._id}`}>
                                                <h3 className="text-base font-medium text-secondary group-hover:text-primary transition truncate">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center space-x-1">
                                                <Rating value={product.rating} text={``} />
                                                <span className="text-[10px] text-gray-400">({product.numReviews})</span>
                                            </div>
                                            <p className="text-lg font-bold text-secondary mt-auto">
                                                ₹{product.price ? product.price.toLocaleString() : '0'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShopScreen;
