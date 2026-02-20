import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBox = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const urlKeyword = searchParams.get('keyword') || '';

    const [keyword, setKeyword] = useState(urlKeyword);

    useEffect(() => {
        if (!urlKeyword) {
            setKeyword('');
        } else {
            setKeyword(urlKeyword);
        }
    }, [urlKeyword]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?keyword=${keyword.trim()}`);
        } else {
            navigate('/shop');
        }
    };

    const clearHandler = () => {
        setKeyword('');
        navigate('/shop');
    };

    return (
        <form onSubmit={submitHandler} className="relative w-full max-w-[280px] mx-8 hidden md:block">
            <div className="relative group">
                <input
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    placeholder="Search timepieces..."
                    className="w-full bg-accent/50 border-none rounded-full py-2.5 pl-11 pr-10 text-xs font-medium focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all duration-300 outline-none"
                />
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                    size={16}
                    strokeWidth={2}
                />
                {keyword && (
                    <button
                        type="button"
                        onClick={clearHandler}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                    >
                        <X size={14} strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBox;
