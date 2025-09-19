import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import type { PreLoginHeaderProps, PreLoginNavItem } from '@/types/header';
import { navItems } from '@/components/Header/PreLoginHeader/pre-login-nav-items';
import { scrollToElement, scrollToTop } from '@/utils/scroll';
import logoMark from '@/assets/logos/logo-mark-transparent.png';



const PreLoginHeader = ({ className = '' }: PreLoginHeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle hash navigation when landing on home page
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const elementId = location.hash.substring(1);
            // Small delay to ensure the page is fully loaded
            setTimeout(() => {
                scrollToElement(elementId);
            }, 100);
        }
    }, [location.pathname, location.hash]);

    const handleNavItemClick = (item: PreLoginNavItem, event: React.MouseEvent) => {
        event.preventDefault();
        
        if (item.isScrollable) {
            // For scrollable items, check if we're on the home page
            if (location.pathname !== '/') {
                // If not on home page, navigate to home with hash
                if (item.href === '/') {
                    navigate('/');
                } else if (item.href.startsWith('#')) {
                    // Navigate to home page with the hash
                    navigate(`/${item.href}`);
                }
            } else {
                // Already on home page, just scroll
                if (item.href === '/') {
                    scrollToTop();
                } else if (item.href.startsWith('#')) {
                    const elementId = item.href.substring(1);
                    scrollToElement(elementId);
                }
            }
        } else {
            // For non-scrollable items, navigate to the route
            navigate(item.href);
        }
        
        // Close mobile menu if open
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50
                bg-slate-900/95 backdrop-blur-md border-b border-slate-800
                ${className}
            `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <NavLink to="/" className="flex items-center space-x-3">
                            <img 
                                src={logoMark} 
                                alt="Affiniti Solutions Logo" 
                                className="h-10 w-auto"
                            />
                            <div className="text-white">
                                <div className="text-xl font-bold">Affiniti Solutions</div>
                                <div className="text-xs text-cyan-400 font-medium">DEEPTRUST OS</div>
                            </div>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2 text-sm">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative">
                                {item.isScrollable ? (
                                    <button
                                        onClick={(event) => handleNavItemClick(item, event)}
                                        className="text-white hover:bg-cyan-600 transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <NavLink
                                        to={item.href}
                                        className="text-white hover:bg-cyan-600 transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer"
                                    >
                                        {item.label}
                                    </NavLink>
                                )}
                            </div>
                        ))}
                        
                        {/* Schedule Discovery Call Button */}
                        <button 
                            className="btn-primary"
                            onClick={() => {
                                // TODO: Add lead into
                                // addLeadToCRM({
                                //     name: 'Schedule Discovery Call',
                                //     email: 'schedule@discovery.com',
                                //     phone: '1234567890',
                                //     message: 'Schedule a discovery call'
                                // });

                                window.open('https://calendly.com/natekievman/ai-accelerator-exploratory-call', '_blank');
                                console.log('Schedule Discovery Call clicked');
                            }}
                        >
                            Schedule Discovery Call
                        </button>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-600 transition-colors duration-200 cursor-pointer"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <FaTimes className="block h-6 w-6" />
                            ) : (
                                <FaBars className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 rounded-b-lg">
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.isScrollable ? (
                                        <button
                                            onClick={(event) => handleNavItemClick(item, event)}
                                            className="block w-full text-left text-white hover:bg-cyan-600 transition-colors duration-200 py-2 cursor-pointer"
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={item.href}
                                            className="block text-white hover:bg-cyan-600 transition-colors duration-200 py-2 cursor-pointer"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Schedule Discovery Call Button */}
                            <div className="pt-4 border-t border-slate-700">
                                <button 
                                    className="w-full btn-primary"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        // TODO: Add modal functionality
                                        console.log('Schedule Discovery Call clicked');
                                    }}
                                >
                                    Schedule Discovery Call
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default PreLoginHeader;
