import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';
import CategoryCarousel from '../components/CategoryCarousel';

const HomeScreen = () => {
    const { data, isLoading, error } = useGetProductsQuery({
        keyword: '',
        pageNumber: 1,
    });

    return (
        <div className="pb-20">
            <Helmet>
                <title>Wristix </title>
                <meta name="description" content="Discover luxury timepieces" />
            </Helmet>

            <CategoryCarousel category="Home" />

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-12 mt-20">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
                            <div>
                                <h2 className="text-4xl font-accent font-medium text-secondary mb-2">Bestsellers</h2>
                                <div className="h-1 w-20 bg-primary"></div>
                            </div>
                            <Link to="/shop" className="flex items-center text-secondary hover:text-primary transition font-semibold uppercase text-xs tracking-widest group">
                                View all products <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {data.products.map((product) => (
                                <div key={product._id} className="group flex flex-col">
                                    <Link to={`/product/${product._id}`} className="relative overflow-hidden bg-accent aspect-[4/5] mb-6 block">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                                        {/* Optional "Quick View" or Badge could go here */}
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="w-full bg-white text-secondary py-3 text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-primary hover:text-white transition">
                                                Quick View
                                            </button>
                                        </div>
                                    </Link>

                                    <div className="flex-grow flex flex-col space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{product.brand || 'Luxury Watch'}</p>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
