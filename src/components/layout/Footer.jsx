import React from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";

const Footer = () => {
    const shareUrl = "https://yourstore.com"; // Replace with your store URL
    const title = "Check out this amazing store!";

    return (
        <div className="dark:bg-black bg-gray-900">

            <footer className="bg-gray-900 text-white mt-10 dark:bg-black max-w-6xl mx-auto">
                {/* Top copyright */}
                <div className="text-center py-2 border-b border-gray-700 text-sm">
                    © {new Date().getFullYear()} <span className="text-orange-600">Pulse</span>Tech. All rights reserved.
                </div>

                {/* Main sections */}
                <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
                    {/* Section 1: About & Social */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3"><span className="text-orange-600">Pulse</span>Tech</h2>
                        <p className="mb-4 text-gray-300">
                            We provide high-quality products and services to make your life easier and enjoyable. Follow us to stay updated!
                        </p>
                        <div className="flex space-x-3">
                            <FacebookShareButton url={shareUrl} quote={title}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={shareUrl} title={title}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <WhatsappShareButton url={shareUrl} title={title}>
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>

                    {/* Section 2: Contact Us */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                        <ul className="text-gray-300 space-y-2">
                            <li>Email: <a href="mailto:support@yourstore.com" className="hover:underline">support@pulsetech.com</a></li>
                            <li>Phone: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></li>
                            <li>Address: 123 Main Street, City, Country</li>
                        </ul>
                    </div>

                    {/* Section 3: Quick Links */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
                        <ul className="text-gray-300 space-y-2">
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/shop" className="hover:underline">Products</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                            <li><a href="/faqs" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom copyright for mobile spacing */}
                <div className="text-center py-4 text-gray-400 text-sm border-t border-gray-700">
                    Made with ❤️ by Qaiser Javed
                </div>
            </footer>
        </div>
    );
};

export default Footer;