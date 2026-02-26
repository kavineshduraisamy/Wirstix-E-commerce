import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-gray-500 pt-20 mt-auto border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)]">
            <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-20">
                <div className="md:col-span-1">
                    <span className="text-2xl font-accent font-black tracking-tighter text-secondary uppercase">Wristix</span>
                    <p className="text-sm font-light leading-relaxed">
                        Experience precision and elegance. Our curated collection of luxury timepieces is designed for those who value timeless craftsmanship.
                    </p>
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">Collections</h4>
                    <ul className="space-y-3 text-sm font-light">
                        <li><a href="/shop?category=Men" className="hover:text-primary transition">Men's Watches</a></li>
                        <li><a href="/shop?category=Women" className="hover:text-primary transition">Women's Watches</a></li>
                        <li><a href="/shop?category=Smart" className="hover:text-primary transition">Smart Watches</a></li>
                        <li><a href="/shop?category=Premium" className="hover:text-primary transition">Premium Brands</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">Support</h4>
                    <ul className="space-y-3 text-sm font-light">
                        <li><a href="/shipping" className="hover:text-primary transition">Shipping Policy</a></li>
                        <li><a href="/returns" className="hover:text-primary transition">Returns & Exchanges</a></li>
                        <li><a href="/faq" className="hover:text-primary transition">FAQs</a></li>
                        <li><a href="/contact" className="hover:text-primary transition">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">Newsletter</h4>
                    <p className="text-xs font-light mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <div className="flex border-b border-gray-300 pb-2">
                        <input type="email" placeholder="Enter your email" className="bg-transparent border-none focus:outline-none text-xs w-full py-1" />
                        <button className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition">Join</button>
                    </div>
                </div>
            </div>
            <div className="bg-black text-[#f2f2f2] py-10">
                <div className="container mx-auto px-4 lg:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">&copy; {currentYear} Wristix. All Rights Reserved.</p>
                    <div className="flex space-x-10">
                        <a href="#" className="text-gray-400 hover:text-primary transition transform hover:scale-110">
                            <Facebook size={18} strokeWidth={1.5} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary transition transform hover:scale-110">
                            <Instagram size={18} strokeWidth={1.5} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary transition transform hover:scale-110">
                            <Twitter size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
