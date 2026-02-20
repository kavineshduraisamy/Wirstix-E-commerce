import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { id: '01', label: 'Sign In', link: '/login', active: step1 },
        { id: '02', label: 'Shipping', link: '/shipping', active: step2 },
        { id: '03', label: 'Payment', link: '/payment', active: step3 },
        { id: '04', label: 'Place Order', link: '/placeorder', active: step4 },
    ];

    return (
        <nav className="flex justify-center mb-16">
            <div className="flex items-center w-full max-w-4xl px-4">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center relative z-10 flex-1">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 bg-white mb-3 ${step.active ? 'border-primary text-primary scale-110' : 'border-gray-200 text-gray-300'
                                }`}>
                                <span className="text-[10px] font-bold">{step.id}</span>
                            </div>
                            {step.active ? (
                                <Link to={step.link} className="text-[10px] uppercase font-bold text-secondary hover:text-primary transition">
                                    {step.label}
                                </Link>
                            ) : (
                                <span className="text-[10px] uppercase font-bold text-gray-300">
                                    {step.label}
                                </span>
                            )}
                        </div>
                        {index !== steps.length - 1 && (
                            <div className="flex-1 -mt-10 mx-[-20px] relative">
                                <div className={`h-[1px] w-full transition-all duration-700 ${steps[index + 1].active ? 'bg-primary' : 'bg-gray-100'
                                    }`}></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
};

export default CheckoutSteps;
