import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-48">
            <div className="relative w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center shadow-sm bg-white">
                {/* Clock Center */}
                <div className="absolute w-1.5 h-1.5 bg-primary rounded-full z-30 shadow-sm" />

                {/* Hour Hand */}
                <div className="absolute top-[18px] left-1/2 -ml-[1px] w-[2px] h-[14px] bg-secondary rounded-full animate-clock-slow z-10" />

                {/* Minute Hand */}
                <div className="absolute top-[10px] left-1/2 -ml-[0.5px] w-[1px] h-[22px] bg-primary rounded-full animate-clock-fast z-20" />

                {/* Inner Face Details */}
                <div className="absolute inset-[3px] rounded-full border border-gray-100/50" />
            </div>
        </div>
    );
};

export default Loader;
