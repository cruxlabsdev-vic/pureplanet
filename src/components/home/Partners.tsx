import Image from "next/image";
import React from "react";

import { InfiniteSlider } from "@/components/ui/infinite-slider";

const Partners = () => {
    const partners = [
        { src: "/partners/jinko.webp", alt: "Jinko Solar" },
        { src: "/partners/Canadian Solar.webp", alt: "Canadian Solar" },
        { src: "/partners/hanersun.webp", alt: "Hanersun" },
        { src: "/partners/fox-ess-logo.webp", alt: "Fox ESS" },
        { src: "/images/home/neovolt logo.jpeg", alt: "NeoVolt" },
        { src: "/partners/goodwe-logo.svg", alt: "GoodWe" },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#F2F8F2] border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <h3 className="text-3xl font-display font-bold mb-12 text-center text-[#1A1A1A] tracking-tight">
                    Trusted & Accredited Partners
                </h3>

                {/* Partners Container */}
                <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden py-10">
                    <InfiniteSlider gap={60} duration={30} durationOnHover={75}>
                        {partners.map((partner, i) => (
                            <div key={i} className="relative w-[200px] h-[80px] flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Image
                                    src={partner.src}
                                    alt={partner.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
};

export default Partners;
