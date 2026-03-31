'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-purple-950/70 backdrop-blur-[10px] border-b border-white/10">
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Subimage
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden bg-none border-none cursor-pointer text-gray-200 text-2xl"
                >
                    ☰
                </button>

                {/* Links */}
                <ul className="hidden md:flex gap-8 list-none m-0 p-0">
                    <li>
                        <Link href="/home" className="text-gray-200 no-underline text-base transition-all duration-300 ease relative hover:text-blue-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/imagenes" className="text-gray-200 no-underline text-base transition-all duration-300 ease hover:text-blue-400">
                            Gallery
                        </Link>
                    </li>
                </ul>

                <Link href="/login" className="hidden md:block px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-black no-underline rounded-lg font-semibold text-sm transition-all duration-300 ease cursor-pointer hover:shadow-lg hover:shadow-blue-500/50">
                    Login
                </Link>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-4 p-4 bg-zinc-800/95 backdrop-blur-[10px] border-t border-white/10">
                    <Link href="/" className="text-gray-200 no-underline">
                        Home
                    </Link>
                    <Link href="/login" className="text-gray-200 no-underline">
                        Login
                    </Link>
                    <Link href="/imagenes" className="text-gray-200 no-underline">
                        Gallery
                    </Link>
                    <Link href="/register" className="px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-black no-underline rounded-lg font-semibold text-center">
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;