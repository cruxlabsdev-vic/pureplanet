"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

// --- Data ---
const batteries = [
    {
        id: "lynx-c",
        model: "GoodWe Lynx C Series",
        badge: "C&I BATTERY SYSTEM",
        image: "/images/services/goodwe.png",
        description: "The Lynx C 60kWh battery system is designed taking safety as a top priority. With its robust IP55 rating, this battery system is suitable for both indoor and outdoor installations, providing protection against dust and water ingress.",
        features: [
            { icon: "ShieldIcon", title: "Superb Safety", desc: "Safety as a top priority" },
            { icon: "ShieldIcon", title: "IP55 Rated", desc: "Indoor & outdoor installation" },
            { icon: "BatteryIcon", title: "LFP Battery", desc: "High cycle stability" },
            { icon: "ShieldIcon", title: "Reliability", desc: "C4 corrosion protection" },
        ],
        specs: [
            { label: "Capacity", value: "60kWh" },
            { label: "Battery Type", value: "LiFePO4 (LFP)" },
            { label: "Protection", value: "IP55 / C4" }
        ],
    },
    {
        id: "lynx-f-g2",
        model: "GoodWe Lynx F G2 Series",
        badge: "HIGH VOLTAGE BATTERY",
        image: "/images/services/goodwe_products.png",
        description: "A versatile high voltage battery system offering flexible capacity options and plug & play installation for maximum convenience.",
        features: [
            { icon: "EnergyIcon", title: "Flexible Capacity", desc: "6.4 - 28.8kWh" },
            { icon: "VoltIcon", title: "High Voltage", desc: "Efficient power storage" },
            { icon: "InstallIcon", title: "Plug & Play", desc: "Easy installation" },
            { icon: "ExpandIcon", title: "Scalable", desc: "Grow with your needs" },
        ],
        specs: [
            { label: "Capacity", value: "6.4 - 28.8kWh" },
            { label: "Type", value: "High Voltage" },
            { label: "Install", value: "Plug & Play" }
        ],
    }
];

const GoodWeCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    // Auto-play effect
    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000); // 5 seconds per slide
        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#062d16] text-white px-3 py-1 font-bold tracking-wider text-sm">GoodWe</div>
                        <span className="text-gray-400 text-xs tracking-[0.2em] font-medium uppercase">PREMIUM PARTNER</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-[150px] h-[50px] mb-4">
                            <Image
                                src="/partners/goodwe-logo.svg"
                                alt="GoodWe Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[#062d16] mb-4">
                        Smart Energy Storage
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
                        GoodWe offers reliable and safe energy storage solutions, featuring robust protection ratings and high-efficiency LFP technology.
                    </p>
                </div>

                {/* Main Carousel Card */}
                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative">
                    {/* Embla Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {batteries.map((item) => (
                                <div className="flex-[0_0_100%] min-w-0" key={item.id}>
                                    <div className="flex flex-col lg:flex-row min-h-[500px]">
                                        {/* Left Content Section (Swapped compared to FoxESS for variety, or keep same? User said "sameforexx ki tarah cards chalen") */}
                                        {/* FoxESS has Image Left, Content Right. I will stick to that structure for consistency if "carts chalen" means "work like". */}

                                        {/* Left Image Section */}
                                        <div className="relative w-full lg:w-[45%] bg-[#F4F6F8] flex items-center justify-center p-12">
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
                                        <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center text-[#062d16]">
                                            <div className="flex items-center gap-2 mb-4 text-[#C2F32C] font-bold tracking-wider text-xs uppercase">
                                                <span>★</span> {item.badge}
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                                {item.model}
                                            </h3>

                                            <p className="text-gray-600 mb-8 leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Feature Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                                                {item.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className="text-[#C2F32C] text-xl mt-0.5">
                                                            {/* Map simple icons */}
                                                            {feature.icon === "ShieldIcon" && "🛡️"}
                                                            {feature.icon === "BatteryIcon" && "🔋"}
                                                            {feature.icon === "EnergyIcon" && "⚡"}
                                                            {feature.icon === "VoltIcon" && "🔌"}
                                                            {feature.icon === "InstallIcon" && "🔧"}
                                                            {feature.icon === "ExpandIcon" && "↔"}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm text-[#062d16]">{feature.title}</div>
                                                            <div className="text-gray-500 text-xs">{feature.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Specs Table */}
                                            <div className="bg-[#F2F8F2] rounded-xl p-6 mb-8 border border-gray-100">
                                                <div className="grid grid-cols-2 gap-y-3 text-sm">
                                                    <div className="text-gray-500 font-medium border-b border-gray-200 pb-2">Feature</div>
                                                    <div className="text-gray-500 font-medium border-b border-gray-200 pb-2">Specification</div>

                                                    {item.specs.map((spec, sIdx) => (
                                                        <React.Fragment key={sIdx}>
                                                            <div className="text-gray-600 font-medium border-b border-gray-200 pb-2 last:border-0">{spec.label}</div>
                                                            <div className="text-[#062d16] font-bold border-b border-gray-200 pb-2 last:border-0">{spec.value}</div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Button */}
                                            <div>
                                                <Link href="/quote-form" className="inline-block w-full md:w-auto">
                                                    <button className="bg-[#062d16] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0a4523] transition-colors duration-300 w-full md:w-auto text-center">
                                                        Get a Quote for GoodWe
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoodWeCarousel;
