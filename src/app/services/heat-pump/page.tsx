import { Metadata } from 'next';
import Image from "next/image";
import Link from 'next/link';

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/layout/Footer";
import HighEfficiencySection from "@/components/services/HighEfficiencySection";
import HeatPumpCarousel from "@/components/services/HeatPumpCarousel";
import FAQ from "@/components/shared/FAQ";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
    title: "Heat Pump Hot Water Systems Melbourne | Victorian Rebates Up to $1,400 | Pure Planet",
    description: "Save up to 80% on hot water costs with an energy-efficient heat pump. Stiebel Eltron, Sanden & Reclaim Energy systems. Claim Victorian rebates up to $1,400. Melbourne installation.",
    keywords: "heat pump hot water melbourne, victorian hot water rebate, reclaim energy, stiebel eltron, sanden, gas to electric hot water, solar victoria rebate",
    alternates: {
        canonical: 'https://pureplanet.net.au/services/heat-pump'
    }
};

export default function HeatPumpPage() {
    // Assets
    const heroBg = "/images/home/00e0bb3995ee8488298be500605deb08548f253e.webp";
    const introImg = "/images/home/4041c6a79ff25b229e93d067f8b38794152145fb.webp";
    const heatPumpIntroImg = "/images/services/hot-water-heat-pump.webp";
    const contentImg = "/images/services/heat-pump-benefits.webp";
    const videoThumb = "/Pure Planet Images/Partner Program/engineer-installing-solar-panels-roofs-homes-residential-commercial-buildings-renewable-energy-sustainable-resources-concept-generative-ai (1).webp";
    const statsBg = "/Pure Planet Images/Heat Pump/25468.webp";
    const gallery2 = "/images/home/79dc47370870f61f1d2fc84fa0e66abd5060318a.webp";

    // Heat Pump Products (NO batteries or solar panels!)
    const heatPumpProducts = [
        {
            id: 1,
            name: "Stiebel Eltron WWK 222",
            subtitle: "All-in-One Heat Pump",
            capacity: "220L",
            image: "/images/services/card-heat-pump.webp",
            tag: "Best for Small-Medium Homes",
            rebateEligible: true,
        },
        {
            id: 2,
            name: "Reclaim Energy CO₂ 315L",
            subtitle: "Split System Heat Pump",
            capacity: "315L",
            image: "/images/services/card-heat-pump.webp",
            tag: "Best for Solar Homes & Families",
            rebateEligible: true,
            featured: true,
        },
        {
            id: 3,
            name: "Sanden Eco Plus 315L",
            subtitle: "CO₂ Split System",
            capacity: "315L",
            image: "/images/services/card-heat-pump.webp",
            tag: "Best for Noise-Sensitive Locations",
            rebateEligible: true,
        },
    ];

    return (
        <main className="min-h-screen font-sans bg-white text-secondary">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroBg}
                        alt="Heat Pump Hot Water Systems"
                        fill
                        className="object-cover opacity-60"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-16">
                    <div className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-4">
                        <Link href="/" className="hover:text-white transition">Home</Link> — <span className="text-primary">Services</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">Heat Pump Hot Water</h1>

                </div>
            </section>

            {/* 2. Intro Section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={heatPumpIntroImg}
                            alt="Heat Pump Hot Water Unit"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-4xl font-display font-bold mb-6 leading-tight">
                            The Smartest Way to<br />Heat Water in 2026
                        </h2>
                        <p className="text-gray-700 mb-4 font-bold text-base leading-relaxed">
                            Heat pump hot water systems are the smartest way to heat water in 2026. Instead of burning gas or using electric elements, they extract free heat from the surrounding air—even on cold Melbourne days—and use it to heat your water.
                        </p>
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">
                            Think of it as a reverse fridge: a fridge pumps heat OUT to keep food cold, a heat pump pumps heat IN to keep water hot. This proven technology turns 1kW of electricity into up to 5kW of heat, making it 4-5x more efficient than traditional systems.
                        </p>
                        <p className="text-gray-600 mb-8 text-base leading-relaxed">
                            With gas prices rising and Victorian Government rebates now available, thousands of Melbourne homeowners are making the switch.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/contact">
                                <button className="bg-primary text-secondary-dark font-bold py-3 px-8 rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 text-sm">
                                    Check My Rebate Eligibility
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <div className="leading-tight">
                                    <span className="block text-xs font-bold uppercase text-gray-400">Talk To Us</span>
                                    <a href="tel:0450010419" className="block font-bold hover:text-primary transition">0450 010 419</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fox ESS Heat Pump Products Carousel */}
            <HeatPumpCarousel />

            {/* 4. Why Choose a Heat Pump - Updated Benefits */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-5xl font-bold font-display mb-8">Why Choose a Heat Pump?</h3>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "The Gas Bill Killer",
                                    desc: "Gas prices in Victoria are rising every year. A heat pump uses up to 80% less energy than your old gas or electric hot water system."
                                },
                                {
                                    title: "Works in Melbourne Winters",
                                    desc: "Our heat pumps are designed for Australian conditions. Reclaim and Stiebel Eltron units work efficiently down to -10°C—perfect for Melbourne's coldest days."
                                },
                                {
                                    title: "Your Free Solar Battery",
                                    desc: "Don't have a home battery? Your heat pump acts like one. It stores your excess solar energy as hot water during the day, so you use it at night—for free."
                                },
                                {
                                    title: "Double Rebates Available",
                                    desc: "Claim BOTH the Solar Victoria Rebate (up to $1,400 for locally-made products) AND Victorian Energy Upgrades (VEU) credits. Stack your savings."
                                },
                                {
                                    title: "Whisper Quiet Operation",
                                    desc: "Modern heat pumps like the Sanden operate at just 37dB—quieter than a conversation. No more noisy gas systems rumbling outside your bedroom."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold mt-1">✓</span>
                                    <div>
                                        <h4 className="font-bold text-lg text-black mb-2">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">
                        <Image src={contentImg} alt="Heat Pump Benefits" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* Brands We Work With - Updated with Reclaim Energy */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-black">Brands We Work With</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We partner only with reliable, well-established heat pump manufacturers that meet Australian performance and safety standards. Every system we install is selected for durability, efficiency, and long-term manufacturer support.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Stiebel Eltron Card */}
                        <div className="bg-[#333333] rounded-3xl p-10 border border-gray-700">
                            <h3 className="text-2xl font-display font-bold text-white mb-4">Stiebel Eltron Heat Pumps</h3>
                            <p className="text-primary text-sm font-bold mb-2">German Engineering. Melbourne Approved.</p>
                            <p className="text-gray-300 mb-6">
                                A precision-engineered brand trusted worldwide for over 100 years. Stiebel Eltron heat pumps deliver consistent hot water with exceptional energy ratings.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "German precision engineering with ultra-quiet operation",
                                    "Exceptional energy efficiency (COP up to 4.0)",
                                    "Designed for consistent hot water supply in all conditions",
                                    "Long service life with minimal maintenance",
                                    "Models eligible for Solar Victoria rebate"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-200 text-sm">
                                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-300 text-sm">
                                <span className="font-bold text-white">Best for:</span> Homeowners who value engineering quality and long-term reliability.
                            </p>
                        </div>

                        {/* Sanden Card */}
                        <div className="bg-[#C8E088] rounded-3xl p-10">
                            <h3 className="text-2xl font-display font-bold text-black mb-4">Sanden Heat Pump Systems</h3>
                            <p className="text-[#062d16] text-sm font-bold mb-2">Japanese Innovation. Australian Tested.</p>
                            <p className="text-gray-800 mb-6">
                                The Sanden Eco Plus uses CO₂ refrigerant—the most environmentally friendly option available—with zero ozone depletion and ultra-low global warming potential.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Natural CO₂ refrigerant for ultra-low environmental impact",
                                    "Outstanding performance in Melbourne's cooler months",
                                    "Extremely quiet operation (37dB—quieter than a library)",
                                    "Excellent local warranty coverage",
                                    "One of the most efficient systems on the Australian market"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-black text-sm">
                                        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-black text-sm">
                                <span className="font-bold">Best for:</span> Environmentally conscious households aiming for maximum efficiency and low noise.
                            </p>
                        </div>

                        {/* Reclaim Energy Card - NEW */}
                        <div className="bg-gradient-to-br from-[#062d16] to-[#0a4522] rounded-3xl p-10 border-2 border-primary">
                            <div className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-bold text-black mb-3">
                                🏆 HIGHEST VEU REBATE
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4">Reclaim Energy CO₂ Heat Pumps</h3>
                            <p className="text-primary text-sm font-bold mb-2">Australian Designed. #1 for Solar Integration.</p>
                            <p className="text-gray-200 mb-6">
                                The award-winning Reclaim Energy system is designed and supported right here in Australia. It's the only heat pump with a Wi-Fi smart controller that speaks directly to your solar inverter—heating water automatically when your panels are producing free power.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Australian-designed with local technical support",
                                    "Wi-Fi smart controller with solar integration",
                                    "CO₂ refrigerant (R744)—the cleanest on the market",
                                    "Industry-leading COP up to 5.0 (80% energy savings)",
                                    "Whisper quiet at 37dB",
                                    "15-year warranty on stainless steel tanks",
                                    "Earns the MOST VEU certificates of any system (biggest rebate!)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-100 text-sm">
                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-200 text-sm">
                                <span className="font-bold text-white">Best for:</span> Homes with solar panels wanting to maximize free hot water. Premium choice for those who want the best long-term value and smart home integration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Services - Updated */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-black">Heat Pump Hot Water Installation</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We deliver tailored heat pump hot water solutions designed around your household size, usage patterns, and energy goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Residential Hot Water Installation",
                                desc: "Complete supply and installation of heat pump hot water systems for Melbourne homes. We handle all permits, rebate paperwork, and old system removal.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary mb-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                )
                            },
                            {
                                title: "Gas to Electric Changeover",
                                desc: "Switching from gas hot water? We'll disconnect your old gas unit, remove it responsibly, and install your new heat pump—all in one visit.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary mb-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                )
                            },
                            {
                                title: "Solar Integration Setup",
                                desc: "Already have solar panels? We'll configure your heat pump to run during peak solar production hours, giving you virtually free hot water.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary mb-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Service & Repairs",
                                desc: "Annual maintenance, troubleshooting, and repairs for all heat pump brands. We service Reclaim, Stiebel Eltron, Sanden, Rheem, and more.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary mb-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m3.12 3.12l-1.921 1.921" />
                                    </svg>
                                )
                            }
                        ].map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
                                <div className="flex flex-col items-center text-center">
                                    {service.icon}
                                    <h3 className="text-xl font-bold font-display text-black mb-3">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Is It Right For You - Updated */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1">
                        <Image
                            src={introImg}
                            alt="Modern Australian Home with Heat Pump"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-black leading-tight">Is a Heat Pump Hot Water System Right for You?</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "Replacing an old gas or electric hot water system",
                                    desc: "If your current system is 10+ years old, upgrading to a heat pump can cut your hot water costs by up to 80%."
                                },
                                {
                                    title: "Homes with rooftop solar panels",
                                    desc: "Heat pumps work perfectly with solar. Schedule your hot water heating during the day when your panels are generating free electricity."
                                },
                                {
                                    title: "Families with high hot water usage",
                                    desc: "Multiple showers, baths, and laundry loads? Heat pumps with 315L tanks keep up with busy households without running out."
                                },
                                {
                                    title: "Getting off gas before the deadline",
                                    desc: "From March 2027, Victorian homes must replace gas hot water with electric alternatives when systems reach end-of-life. Get ahead of the rush."
                                },
                                {
                                    title: "Homeowners wanting lower bills and lower emissions",
                                    desc: "A heat pump is one of the single biggest reductions you can make to your household's energy use and carbon footprint."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold mt-1">✓</span>
                                    <div>
                                        <h4 className="font-bold text-lg text-black mb-1">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - With Explanation */}
            <section className="py-24 bg-gray-50 text-center">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <h2 className="text-4xl font-display font-bold mb-4 text-black">How Does a Heat Pump Hot Water System Work?</h2>
                    <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-8 leading-relaxed">
                        Think of it as a <span className="font-bold text-[#062d16]">reverse fridge</span>. A fridge pumps heat OUT to keep food cold. A heat pump pumps heat IN from the surrounding air to keep water hot.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                        {[
                            {
                                num: "1",
                                title: "Fan pulls in air",
                                desc: "Even cold air contains heat energy"
                            },
                            {
                                num: "2",
                                title: "Refrigerant absorbs heat",
                                desc: "A special gas captures the warmth"
                            },
                            {
                                num: "3",
                                title: "Compressor concentrates heat",
                                desc: "Turns low-grade warmth into high-temperature heat"
                            },
                            {
                                num: "4",
                                title: "Heat exchanger transfers to water",
                                desc: "Hot water is stored in an insulated tank"
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-black mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-12 leading-relaxed">
                        The result? For every 1kW of electricity used, you get <span className="font-bold text-[#062d16]">4-5kW of heat</span>. That's why heat pumps use up to 80% less energy than traditional electric systems.
                    </p>

                    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer max-w-5xl mx-auto">
                        <Image src={videoThumb} alt="How Heat Pumps Work Video" fill className="object-cover brightness-75 group-hover:brightness-90 transition duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse group-hover:animate-none group-hover:scale-110 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-black ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="relative py-24 bg-black text-white">
                <div className="absolute inset-0 z-0">
                    <Image src={statsBg} alt="Background" fill className="object-cover opacity-30" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                    {[
                        {
                            val: "20+",
                            label: "Years Of Experience",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.854 1.5-2.418a1.5 1.5 0 011.644.052c.976.658 1.5 1.76 1.5 2.854l-11.25.041c0-1.096.524-2.202 1.5-2.86a1.5 1.5 0 011.644-.053c.842.565 1.5 1.436 1.5 2.42V18" />
                                </svg>
                            )
                        },
                        {
                            val: "30",
                            label: "Awards Won",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.961 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.962 3.99-2.48 5.228m2.48-5.546a6.003 6.003 0 01-5.353 4.273m4.273 4.273a6.726 6.726 0 01-2.747 1.35" />
                                </svg>
                            )
                        },
                        {
                            val: "100+",
                            label: "Projects Completed",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                </svg>
                            )
                        },
                        {
                            val: "5k",
                            label: "Happy Customers",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            )
                        },
                        {
                            val: "2M",
                            label: "Hours Of Work",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                        }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center p-4">
                            {stat.icon}
                            <span className="text-4xl font-bold font-display mb-2">{stat.val}</span>
                            <span className="text-sm text-gray-300 font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Trust Us */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black leading-tight">Why Trust Us for Heat Pump Services Across Melbourne</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            We are known for delivering professional, compliant, and long-lasting heat pump installations. From consultation to installation and aftercare, everything is handled in-house by qualified technicians, no shortcuts, no outsourcing.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed italic border-l-4 border-primary pl-4">
                            Our approach is built on traditional values: doing the job properly, using quality products, and standing by our work long after installation.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "We offer responsive support across Melbourne, including emergency assistance when your hot water system fails unexpectedly.",
                                "We are a locally operated business with hands-on experience installing heat pump systems in Melbourne homes and commercial properties.",
                                "No matter where you're located, our team provides consistent service quality across all Melbourne suburbs.",
                                "Clear quotes, upfront costs, and no hidden fees. You know exactly what you're paying for before work begins."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-xs font-bold mt-1">✓</span>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                        <Image src={gallery2} alt="Trusted Service" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* 7. High-Efficiency Products */}
            <HighEfficiencySection />

            {/* FAQ - Updated Questions */}
            <FAQ
                title="Frequently Asked Questions"
                items={[
                    {
                        question: "Is my electrical switchboard ready for a heat pump?",
                        answer: "Most Melbourne homes are ready, but older properties might need a minor switchboard upgrade. Our quote includes a full electrical assessment at no extra cost—we'll let you know if any upgrades are needed before we start."
                    },
                    {
                        question: "How noisy are heat pumps?",
                        answer: "Modern units like the Sanden and Reclaim operate at just 37dB—that's quieter than a normal conversation or a library. We also position the outdoor unit away from bedroom windows to ensure you won't hear it at night."
                    },
                    {
                        question: "Will a heat pump work in Melbourne's cold winters?",
                        answer: "Absolutely. Our Stiebel Eltron, Sanden, and Reclaim units are specifically designed for Australian conditions and work efficiently down to -10°C. Melbourne's coldest mornings are no problem."
                    },
                    {
                        question: "How much can I actually save?",
                        answer: "Most households save 70-80% on hot water energy costs. If you have solar panels and schedule your heat pump to run during the day, your hot water can be virtually free. Typical savings are $400-$800 per year depending on your usage and current system."
                    },
                    {
                        question: "What rebates can I claim in Victoria?",
                        answer: "You can stack multiple rebates: Solar Victoria Hot Water Rebate ($1,400 for locally-made products or $1,000), Victorian Energy Upgrades (VEU) ($600-$1,200+ depending on your old system), and Federal STCs (additional discount applied at point of sale). Combined, you could receive $2,000-$3,000+ off your new system."
                    },
                    {
                        question: "How long does installation take?",
                        answer: "Most residential heat pump installations are completed in half a day (4-6 hours). This includes removing your old system, installing the new heat pump, connecting plumbing and electrical, and testing everything."
                    },
                    {
                        question: "What happens to my old hot water system?",
                        answer: "We remove and responsibly dispose of your old gas or electric system as part of every installation. There's no extra charge for removal."
                    },
                    {
                        question: "Can I connect a heat pump to my existing solar panels?",
                        answer: "Yes! In fact, this is the ideal setup. Heat pumps like the Reclaim Energy have smart controllers that integrate directly with solar inverters, automatically heating water when your panels are producing excess power."
                    }
                ]}
            />

            {/* Call To Action - Updated */}
            <CallToAction
                title="Ready to Slash Your Hot Water Bills?"
                description="Join thousands of Melbourne homeowners who've already made the switch. With Victorian rebates of up to $2,500+ available, there's never been a better time to upgrade to a heat pump hot water system."
                buttonText="Check My Rebate Eligibility"
                href="/contact"
            />

            <Footer />
        </main >
    );
}
