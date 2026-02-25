import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CategoryCarousel = ({ category }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const categoryContent = {
        Men: [
            {
                image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'The Gentleman\'s Collection',
                subtitle: 'Timeless precision for the modern man'
            },
            {
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Engineered Excellence',
                subtitle: 'Masterpieces of horological engineering'
            }
        ],
        Women: [
            {
                image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Graceful Radiance',
                subtitle: 'Elegant timepieces for every occasion'
            },
            {
                image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'The Jewelry of Time',
                subtitle: 'Where luxury meets sophisticated design'
            }
        ],
        Smart: [
            {
                image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Future on Your Wrist',
                subtitle: 'Connect your lifestyle with premium technology'
            },
            {
                image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81822?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Intelligence Reimagined',
                subtitle: 'Performance tracking in a luxury frame'
            }
        ],
        Premium: [
            {
                image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Ultimate Rarity',
                subtitle: 'Exclusive editions for the true connoisseur'
            },
            {
                image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Heritage & Legacy',
                subtitle: 'Timepieces that transcend generations'
            }
        ],
        Home: [
            {
                image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                title: 'Elegance in Every Second',
                subtitle: 'Discover our curated selection of world-class timepieces'
            },
            {
                image: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                title: 'Crafted for Distinction',
                subtitle: 'Where heritage meets contemporary design'
            },
            {
                image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                title: 'A Legacy of Luxury',
                subtitle: 'Timeless masterpieces for the modern connoisseur'
            }
        ],
        Default: [
            {
                image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                title: 'Explore the Collection',
                subtitle: 'Discover the world of Wristix luxury'
            }
        ]
    };

    const slides = categoryContent[category] || categoryContent.Default;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div className="relative h-[450px] overflow-hidden bg-secondary">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-[10px] font-bold text-primary uppercase mb-4 animate-fadeIn">
                            {category || 'Collection'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-accent text-white mb-4 font-medium max-w-2xl">
                            {slide.title}
                        </h2>
                        <p className="text-gray-300 font-light text-sm md:text-base uppercase">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                        aria-label="Previous Slide"
                    >
                        <ArrowLeft className="w-6 h-6" strokeWidth={1} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
                        aria-label="Next Slide"
                    >
                        <ArrowRight className="w-6 h-6" strokeWidth={1} />
                    </button>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1 transition-all duration-500 ${index === currentSlide ? 'w-12 bg-primary' : 'w-4 bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryCarousel;
