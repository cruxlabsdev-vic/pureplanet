"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

// --- Heat Pump Product Data ---
const heatPumps = [
    {
        id: "hydro-box",
        model: "HP Box Series (Hydro Box)",
        badge: "ALL-IN-ONE SYSTEM",
        image: "/fox-ess/heat pump/HYDROBOX.1.webp",
        features: [
            { icon: "BoxIcon", title: "All-In-One", desc: "All components integrated in one box" },
            { icon: "ToolIcon", title: "Easy Setup", desc: "Simplified installation process" },
            { icon: "EfficiencyIcon", title: "High Efficiency", desc: "Optimal energy performance" },
            { icon: "WarrantyIcon", title: "10 Year Warranty", desc: "Long-term reliability" },
        ],
        specs: [
            { label: "Type", value: "Integrated System" },
            { label: "Best For", value: "Complete Solutions" },
            { label: "Installation", value: "Plug & Play" }
        ],
    },
    {
        id: "hydro-module",
        model: "HP Box Series (Hydro Module)",
        badge: "EASY INSTALLATION",
        image: "/fox-ess/heat pump/HYDROMODULE.1.webp",
        features: [
            { icon: "CompactIcon", title: "Easy Installation", desc: "Space-saving solution with compact and light design" },
            { icon: "ModularIcon", title: "Modular Design", desc: "Flexible configuration options" },
            { icon: "EfficiencyIcon", title: "High Efficiency", desc: "Superior thermal performance" },
            { icon: "WarrantyIcon", title: "10 Year Warranty", desc: "Guaranteed durability" },
        ],
        specs: [
            { label: "Type", value: "Modular System" },
            { label: "Best For", value: "Space-Constrained Areas" },
            { label: "Design", value: "Compact & Light" }
        ],
    },
];

const HeatPumpCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Auto-play effect
    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(autoplay);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-end text-right">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-400 text-xs tracking-[0.2em] font-medium uppercase">INNOVATION PARTNER</span>
                        <div className="bg-[#C2F32C] text-[#062d16] px-3 py-1 font-bold tracking-wider text-sm italic transform -skew-x-12">FOXESS</div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[#062d16] mb-4">
                        Heat Pump Hot Water Solutions
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
                        Fox ESS HP Box Series delivers cutting-edge heat pump technology with all-in-one and modular solutions designed for maximum efficiency and easy installation.
                    </p>
                </div>

                {/* Main Carousel Card */}
                <div className="bg-[#062d16] rounded-[3rem] shadow-2xl overflow-hidden relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Embla Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {heatPumps.map((item) => (
                                <div className="flex-[0_0_100%] min-w-0" key={item.id}>
                                    <div className="flex flex-col lg:flex-row min-h-[600px]">
                                        {/* Left Image Section */}
                                        <div className="relative w-full lg:w-[45%] bg-[#e5e7eb] flex items-center justify-center p-12">
                                            <div className="relative w-full h-[300px] lg:h-[400px]">
                                                <Image
                                                    src={item.image}
                                                    alt={item.model}
                                                    fill
                                                    className="object-contain drop-shadow-2xl"
                                                    priority
                                                />
                                            </div>
                                        </div>

                                        {/* Right Content Section */}
                                        <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center text-white">
                                            <div className="flex items-center gap-2 mb-4 text-[#C2F32C] font-bold tracking-wider text-xs uppercase">
                                                <span>🔥</span> {item.badge}
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-bold italic mb-10">
                                                {item.model}
                                            </h3>

                                            {/* Feature Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-10">
                                                {item.features.map((feature, idx) => (
                                                    <div key={idx} className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                                                            <span className="text-[#C2F32C] text-lg">
                                                                {feature.icon === "BoxIcon" && "📦"}
                                                                {feature.icon === "ToolIcon" && "🔧"}
                                                                {feature.icon === "CompactIcon" && "📐"}
                                                                {feature.icon === "ModularIcon" && "🧩"}
                                                                {feature.icon === "EfficiencyIcon" && "⚡"}
                                                                {feature.icon === "WarrantyIcon" && "🛡"}
                                                            </span>
                                                            {feature.title}
                                                        </div>
                                                        <div className="text-gray-400 text-xs pl-7">{feature.desc}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Specs Table */}
                                            <div className="bg-[#0a4523] rounded-xl p-6 mb-8 border border-gray-700">
                                                <div className="grid grid-cols-2 gap-y-3 text-sm">
                                                    <div className="text-gray-400 font-medium border-b border-gray-700 pb-2">Feature</div>
                                                    <div className="text-gray-400 font-medium border-b border-gray-700 pb-2">Specification</div>

                                                    {item.specs.map((spec, sIdx) => (
                                                        <React.Fragment key={sIdx}>
                                                            <div className="text-gray-300 font-medium border-b border-gray-700 pb-2 last:border-0">{spec.label}</div>
                                                            <div className="text-white font-bold border-b border-gray-700 pb-2 last:border-0">{spec.value}</div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Button */}
                                            <div>
                                                <Link href="/quote-form" className="inline-block w-full md:w-auto">
                                                    <button className="bg-[#C2F32C] text-[#062d16] px-8 py-4 rounded-lg font-bold hover:bg-[#a3d615] transition-colors duration-300 w-full md:w-auto text-center">
                                                        Get a Quote for Heat Pump
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center gap-2 pb-6">
                        {heatPumps.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-colors ${selectedIndex === idx ? "bg-[#C2F32C]" : "bg-white/30"
                                    }`}
                                onClick={() => emblaApi?.scrollTo(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeatPumpCarousel;
