// src/components/layout/MobileNav.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react";

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <header className="border-b md:hidden">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <h1 className="text-xl font-bold">
                    <span className="text-orange-600">Basic</span>Store
                </h1>

                {/* Right side icons */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                    <Button size="icon">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>

                    {/* Burger Menu Button */}
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {open && (
                <nav className="bg-white border-t shadow-md">
                    <ul className="flex flex-col px-4 py-4 space-y-3">
                        <li>
                            <Link to="/" className="text-gray-800 font-medium block" onClick={() => setOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-gray-800 font-medium block" onClick={() => setOpen(false)}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-gray-800 font-medium block" onClick={() => setOpen(false)}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
