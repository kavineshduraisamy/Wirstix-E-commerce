const Message = ({ variant = 'info', children }) => {
    const variants = {
        info: 'bg-blue-50/50 text-blue-600 border-blue-100',
        success: 'bg-green-50/50 text-green-600 border-green-100',
        error: 'bg-red-50/50 text-red-600 border-red-100',
        warning: 'bg-yellow-50/50 text-yellow-600 border-yellow-100',
    };

    return (
        <div className={`p-5 mb-6 text-[13px] font-light leading-relaxed rounded-sm border ${variants[variant]}`} role="alert">
            {children}
        </div>
    );
};

export default Message;
