import Image from "next/image";
import Link from "next/link";

import React from "react";

const Footer = () => {
    return (
        <footer className="relative bg-[#050505] text-white pt-10 pb-5 overflow-hidden">
            {/* Optional Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                {/* Placeholder for the solar panel background texture functionality if needed */}
                <Image
                    src="/images/home/c941ecc89f3dbe9baf5f1a90485a71e6093728c1.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8 mb-10">

                    {/* 1. Logo Section */}
                    <div className="lg:w-1/5">
                        {/* Brand / Logo */}
                        <div className="mb-8">
                            <Link href="/" className="inline-block relative w-48 h-14">
                                <Image
                                    src="/Pure planet Logo/logo.webp"
                                    alt="Pure Planet"
                                    fill
                                    className="object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Latest News */}
                    <div className="lg:w-1/6">
                        <h4 className="text-xl font-bold mb-6">Latest News</h4>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link href="/services/solar-panels" className="hover:text-[#C2F32C] transition-colors">Solar Installation</Link></li>
                            <li><Link href="/contact" className="hover:text-[#C2F32C] transition-colors">Consulting Services</Link></li>
                            <li><Link href="/contact" className="hover:text-[#C2F32C] transition-colors">Energy Audits</Link></li>
                            <li><Link href="/our-work" className="hover:text-[#C2F32C] transition-colors">Case Studies</Link></li>
                            <li><Link href="/blogs" className="hover:text-[#C2F32C] transition-colors">Video Tutorials</Link></li>
                        </ul>
                    </div>

                    {/* 3. Services */}
                    <div className="lg:w-1/6">
                        <h4 className="text-xl font-bold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link href="/services/solar-panels" className="hover:text-[#C2F32C] transition-colors">Solar Panels</Link></li>
                            <li><Link href="/services/home-battery" className="hover:text-[#C2F32C] transition-colors">Home Batteries</Link></li>
                            <li><Link href="/services/heat-pump" className="hover:text-[#C2F32C] transition-colors">Heat Pump Installation</Link></li>
                            <li><Link href="/about" className="hover:text-[#C2F32C] transition-colors">How it works</Link></li>
                            <li><Link href="/installer" className="hover:text-[#C2F32C] transition-colors">Installer Program</Link></li>
                        </ul>
                    </div>

                    {/* 4. Contact */}
                    <div className="lg:w-1/6">
                        <h4 className="text-xl font-bold mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li><Link href="/contact" className="hover:text-[#C2F32C] transition-colors">Our Locations</Link></li>
                            <li><Link href="/partner-program" className="hover:text-[#C2F32C] transition-colors">Partner Program</Link></li>
                            <li><Link href="/calculator" className="hover:text-[#C2F32C] transition-colors">Calculator</Link></li>
                            <li><Link href="/installer" className="hover:text-[#C2F32C] transition-colors">Installer</Link></li>
                            <li><Link href="/contact" className="hover:text-[#C2F32C] transition-colors">Chat Support</Link></li>
                        </ul>
                    </div>

                    {/* 5. Newsletter */}
                    <div className="lg:w-1/4">
                        <h4 className="text-xl font-bold mb-6 text-right lg:text-right">Newsletter Subscription</h4>

                        {/* Unique Input with Left Button */}
                        <div className="relative mb-4">
                            <input
                                type="email"
                                placeholder="Your E-mail"
                                className="w-full h-10 rounded-full pl-12 pr-6 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C2F32C]"
                            />
                            <button className="absolute left-1 top-1 w-8 h-8 bg-[#C2F32C] rounded-full flex items-center justify-center hover:bg-black hover:text-[#C2F32C] transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-black group-hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-end items-center mb-6 gap-2">
                            <span className="text-sm text-gray-300">I agree to the <Link href="/privacy-policy" className="underline hover:text-[#C2F32C]">privacy policy</Link></span>
                            <div className="w-4 h-4 border border-white rounded-sm cursor-pointer hover:bg-[#C2F32C] hover:border-[#C2F32C] transition-colors"></div>
                        </div>

                        <div className="text-right">
                            <h5 className="text-lg font-bold mb-4">We Are On Social Media</h5>
                            <div className="flex justify-end gap-3">
                                {/* WhatsApp */}
                                <a href="https://wa.me/450010419" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.248-.297.371-.495.124-.198.062-.371-.03-.568-.099-.198-.891-2.147-1.22-2.942-.314-.766-.63-.66-.861-.669-.221-.008-.474-.011-.726-.011-.252 0-.66.096-1.006.471-.346.375-1.321 1.291-1.321 3.149 0 1.858 1.352 3.653 1.541 3.901.189.248 2.661 4.061 6.446 5.694 2.502 1.079 3.011.862 3.555.807.544-.055 1.758-.718 2.006-1.413.248-.695.248-1.289.173-1.414z" />
                                    </svg>
                                </a>
                                {/* Pinterest */}
                                <a href="https://www.pinterest.com/kamrashubhang/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                {/* Reddit */}
                                <a href="https://www.reddit.com/user/PurePlanet_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
                                    </svg>
                                </a>
                                {/* Threads */}
                                <a href="https://www.threads.com/@planet9298" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.755-.365-.423-.84-.634-1.414-.634-.572 0-1.011.211-1.364.634-.353.423-.556.98-.606 1.67l-2.05-.123c.096-1.099.478-2.076 1.14-2.917.661-.84 1.636-1.311 2.915-1.311 1.365 0 2.432.47 3.176 1.4.744.93 1.12 2.186 1.12 3.762v6.816c0 .095.047.142.142.142h.284c.095 0 .142-.047.142-.142v-6.816c0-1.576-.376-2.832-1.12-3.762-.744-.93-1.811-1.4-3.176-1.4-1.279 0-2.254.471-2.915 1.311-.662.841-1.044 1.818-1.14 2.917l2.05.123c.05-.69.253-1.247.606-1.67.353-.423.792-.634 1.364-.634.574 0 1.049.211 1.414.634.365.423.614 1.013.74 1.755a13.853 13.853 0 0 0-3.02-.142c-1.464.084-2.703.531-3.583 1.291-.922.797-1.395 1.892-1.33 3.082.067 1.224.689 2.275 1.752 2.964.898.583 2.057.866 3.259.801 1.59-.086 2.844-.688 3.73-1.79.662-.826 1.092-1.92 1.284-3.272.761.45 1.324 1.04 1.634 1.75.528 1.205.557 3.185-1.09 4.798-1.442 1.414-3.177 2.025-5.8 2.045z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/planet9298/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="https://www.facebook.com/profile.php?id=61586682674853" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C2F32C] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white pt-3 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                    <div className="flex gap-6">
                        <Link href="/terms-conditions" className="hover:text-[#C2F32C] transition-colors">Terms & Condition</Link>
                        <Link href="/privacy-policy" className="hover:text-[#C2F32C] transition-colors">Privacy Policy</Link>
                    </div>
                    <p>All Right Reserved &copy; 2026 Pure Planet</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
