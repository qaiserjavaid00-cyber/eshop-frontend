import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import UserMenu from "../user/UserMenu";

export default function Navbar() {

    const cart = useSelector((state) => state.cart)

    const quantity = cart.cartItems.reduce(
        (sum, item) => sum + Number(item.qty || 0),
        0
    );

    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <header className="border-b z-50 sticky top-0 max-w-6xl mx-auto">
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <span className="text-orange-600">Basic</span>Store
                </h1>

                {/* Desktop menu */}
                <nav className="hidden md:flex gap-6 text-lg font-semibold">
                    <Link to="/">Home</Link>
                    <Link to="/Shop">Products</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3 relative">

                    <SearchBar />


                    <UserMenu />


                    <Button size="icon" className="relative" asChild>
                        <Link to="/cart">
                            <ShoppingCart className="h-3 w-3" />

                            {quantity > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="
                                absolute -top-1 -right-1
                h-5 min-w-[20px]
                px-1
                flex items-center justify-center
                rounded-full
                text-[11px]
                "
                                >
                                    {quantity > 99 ? "99+" : quantity}
                                </Badge>
                            )}
                        </Link>
                    </Button>


                    {/* Mobile Burger */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleMenu}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden">
                    <ul className="flex flex-col px-6 py-4 space-y-4">
                        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link to="/shop" onClick={() => setOpen(false)}>Products</Link>
                        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                    </ul>
                </div>
            )}
        </header>
    );
}
