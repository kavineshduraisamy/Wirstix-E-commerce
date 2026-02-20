import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text }) => {
    return (
        <div className="flex items-center space-x-0.5">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span key={index}>
                        {value >= ratingValue ? (
                            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        ) : value >= ratingValue - 0.5 ? (
                            <StarHalf className="w-3.5 h-3.5 fill-gold text-gold" />
                        ) : (
                            <Star className="w-3.5 h-3.5 text-gray-200" />
                        )}
                    </span>
                );
            })}
            {text && <span className="ml-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{text}</span>}
        </div>
    );
};

export default Rating;
