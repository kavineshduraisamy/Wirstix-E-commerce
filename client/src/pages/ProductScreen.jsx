import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../redux/productsApiSlice';
import { addToCart } from '../redux/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto px-4 lg:px-12 py-10">
            <Helmet>
                <title>{product?.name || 'Loading'} | Wristix</title>
                <meta name="description" content={product?.description || 'Discover luxury timepieces'} />
            </Helmet>

            <Link className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition mb-10" to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="bg-accent aspect-square overflow-hidden group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="border-b border-gray-100 pb-8 mb-8">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">{product.brand || 'Luxury Timepiece'}</p>
                                <h1 className="text-4xl font-accent font-medium text-secondary mb-4 leading-tight">{product.name}</h1>

                                <div className="flex items-center space-x-4 mb-6">
                                    <Rating value={product.rating} text={``} />
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">({product.numReviews} Reviews)</span>
                                </div>

                                <p className="text-3xl font-light text-secondary">
                                    ₹{product.price ? product.price.toLocaleString() : '0'}
                                </p>
                            </div>

                            <div className="space-y-8 mb-10">
                                <div>
                                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-3">Description</h4>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between py-4 border-y border-gray-100">
                                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">Availability</span>
                                    <span className={`text-[11px] uppercase font-bold tracking-widest ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex flex-col space-y-4">
                                        <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">Quantity</h4>
                                        <select
                                            className="w-full appearance-none bg-white border border-gray-200 rounded-sm py-3 px-4 hover:border-secondary transition cursor-pointer text-sm font-medium focus:outline-none"
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <button
                                className={`w-full py-5 rounded-sm font-bold uppercase tracking-widest text-xs transition duration-300 shadow-sm ${product.countInStock === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'
                                    }`}
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
                            </button>

                            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                                        <span className="text-[10px] font-bold">7D</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                                        <span className="text-[10px] font-bold">₹₹</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 pt-20 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-sans font-medium text-secondary mb-6">Customer Reviews</h2>
                                {product?.reviews?.length === 0 ? (
                                    <p className="text-gray-400 font-light">No reviews yet. Be the first to share your thoughts.</p>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-4xl font-bold text-secondary">{product?.rating}</span>
                                            <Rating value={product?.rating} />
                                        </div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Based on {product?.numReviews} Reviews</p>
                                    </div>
                                )}

                                <div className="mt-10 bg-accent p-8 rounded-sm">
                                    <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Write a Review</h4>
                                    {userInfo ? (
                                        <form onSubmit={submitHandler} className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Rating</label>
                                                <select
                                                    className="w-full bg-white border border-gray-200 p-3 text-xs focus:outline-none focus:border-secondary"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Comment</label>
                                                <textarea
                                                    className="w-full bg-white border border-gray-200 p-3 text-xs focus:outline-none focus:border-secondary min-h-[100px]"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-secondary text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition"
                                                disabled={loadingProductReview}
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    ) : (
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Please <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link> to share your experience with this timepiece.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="space-y-10">
                                    {product?.reviews?.map((review) => (
                                        <div key={review._id} className="border-b border-gray-50 pb-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-secondary uppercase">{review?.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium uppercase">{review?.createdAt?.substring(0, 10)}</span>
                                                </div>
                                                <Rating value={review?.rating} />
                                            </div>
                                            <p className="text-gray-600 font-light leading-relaxed">"{review?.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductScreen;
