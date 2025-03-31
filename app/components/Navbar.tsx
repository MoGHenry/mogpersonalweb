'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    var count = 0;

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
                console.log('Scrolled down', count++);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen && 
                menuRef.current && 
                buttonRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className={`w-full py-6 px-12 transition-all duration-300 ${
            scrolled 
            ? 'bg-black/90 backdrop-blur-md' 
            : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'
        } flex justify-between items-center fixed top-0 left-0 z-50`}>
            {/* Logo/Name */}
            <div>
                <Link href="/" className="font-montserrat font-bold text-2xl text-white">
                    Yueheng Qiu
                </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
                <Link href="/" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    Home
                </Link>
                <Link href="/about" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/about') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    About
                </Link>
                <Link href="/skills" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/skills') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    Skills
                </Link>
                <Link href="/demos" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/demos') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    Demos
                </Link>
                <Link href="/projects" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/projects') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    Projects
                </Link>
                <Link href="/contact" className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all ${isActive('/contact') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    Contact
                </Link>
            </div>

            {/* Mobile Menu Button with animated icon */}
            <button 
                ref={buttonRef}
                className="md:hidden text-white w-6 h-6 relative focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <div className="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span 
                        className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                    ></span>
                    <span 
                        className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    ></span>
                    <span 
                        className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                    ></span>
                </div>
            </button>

            {/* Mobile Menu */}
            <div 
                ref={menuRef}
                className={`md:hidden absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-4 flex flex-col space-y-4 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
            >
                    <Link 
                        href="/" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/about') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link 
                        href="/skills" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/skills') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Skills
                    </Link>
                    <Link 
                        href="/demos" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/demos') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Demos
                    </Link>
                    <Link 
                        href="/projects" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/projects') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Projects
                    </Link>
                    <Link 
                        href="/contact" 
                        className={`font-montserrat font-semibold text-lg text-white hover:text-white/80 transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-4 after:h-[2px] after:bg-white after:transition-all ${isActive('/contact') ? 'after:w-[calc(100%-2rem)]' : 'after:w-0 hover:after:w-[calc(100%-2rem)]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
        </nav>
    );
};
