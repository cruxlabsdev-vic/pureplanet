import { Metadata } from 'next';
import Image from "next/image";
import Link from 'next/link';

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/home/Testimonials";
import HighEfficiencySection from "@/components/services/HighEfficiencySection";
import FAQ from "@/components/shared/FAQ";

export const metadata: Metadata = {
    title: "Solar Panels Melbourne | $1,400 Victorian Rebate | Tier-1 Systems | Pure Planet",
    description: "Premium solar panel installation in Melbourne. Jinko, Canadian Solar & REC Tier-1 panels. Claim up to $1,400 Victorian rebate + interest-free loans. Free quote & energy assessment.",
    keywords: "solar panels melbourne, victorian solar rebate, tier 1 solar panels, jinko solar, canadian solar, solar installation melbourne, pure planet solar",
    alternates: {
        canonical: 'https://pureplanet.net.au/services/solar-panels'
    }
};

export default function SolarPanelsPage() {
    // Assets
    const heroBg = "/images/home/00e0bb3995ee8488298be500605deb08548f253e.webp";
    const solarRoof = "/Pure Planet Images/Solar Panels/solar-panel-is-set-up-farm - Copy.webp";
    const workerImg = "/Pure Planet Images/Solar Panels/service-details-1-01.webp";
    const installImg = "/images/home/33aff140cdc213167a87fe899ae190714c29a9ed.webp";
    const detailsImg = "/Pure Planet Images/Solar Panels/technicians-installing-solar-panels-suburban-rooftop.webp";
    const residentialImg = "/Pure Planet Images/Solar Panels/residential_solar_panels.webp";
    const commercialImg = "/Pure Planet Images/Solar Panels/commercial_solar_panels.webp";
    const solarRebatesImg = "/Pure Planet Images/Solar Panels/solar_rebates.webp";
    const safetyImg = "/Pure Planet Images/Solar Panels/solar_safety.webp";
    const qualityImg = "/Pure Planet Images/Solar Panels/solar_components.webp";

    // Solar Panel Products (NO batteries!)
    const solarPanelProducts = [
        {
            id: 1,
            name: "Jinko Tiger Neo N-Type",
            subtitle: "440W - 470W Panels",
            wattage: "440W - 470W",
            image: "/images/services/showcase-jinko.webp",
            tag: "World's #1 Manufacturer",
            warranty: "25-year product, 30-year performance",
            rebateEligible: true,
            featured: true,
        },
        {
            id: 2,
            name: "Canadian Solar HiKu6",
            subtitle: "445W - 460W Panels",
            wattage: "445W - 460W",
            image: "/images/services/showcase-jinko.webp",
            tag: "Tier-1 Global Brand",
            warranty: "25-year product warranty",
            rebateEligible: true,
        },
        {
            id: 3,
            name: "REC Alpha Pure Series",
            subtitle: "430W - 450W Panels",
            wattage: "430W - 450W",
            image: "/images/services/showcase-jinko.webp",
            tag: "Premium European Quality",
            warranty: "25-year warranty",
            rebateEligible: true,
        },
        {
            id: 4,
            name: "Trina Vertex S+ N-Type",
            subtitle: "445W - 455W Panels",
            wattage: "445W - 455W",
            image: "/images/services/showcase-jinko.webp",
            tag: "Best Value Tier-1",
            warranty: "25-year warranty",
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
                        alt="Solar Panels"
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
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">Solar Panels</h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl font-medium">
                        High-Performance Solar Designed for Melbourne Weather
                    </p>
                    <p className="text-gray-300 max-w-2xl mt-4 text-lg">
                        Generate your own power even on cloudy days. We install premium Tier-1 panels backed by the $1,400 Victorian Solar Rebate and 25-year performance warranties.
                    </p>
                </div>
            </section>

            {/* 2. Intro Section - FIXED CONTENT */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={solarRoof}
                            alt="Solar Panels on Roof"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Commercial & Residential Solar Panels Melbourne</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                            Smarter Solar Solutions <br /> For Melbourne Homes
                        </h2>
                        <p className="text-gray-700 mb-4 font-bold text-base leading-relaxed">
                            Pure Planet provides premium solar panel solutions designed for Victorian homes and businesses. We only install Tier-1 panels from trusted manufacturers like Jinko, Canadian Solar, and REC—brands that will still be around in 25 years to honor your warranty.
                        </p>
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">
                            Our team manages everything from consultation to installation using CEC-accredited electricians. No subcontractors, no shortcuts. Just quality solar systems designed to perform in Melbourne's unique climate.
                        </p>
                        <p className="text-gray-600 mb-8 text-base leading-relaxed">
                            With the Victorian Solar Rebate covering up to $1,400 and interest-free loans available, there's never been a better time to go solar.
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C2F32C] text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-all duration-300 group">
                                Contact Now
                                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </span>
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#C2F32C] rounded-full flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-black font-bold text-sm leading-tight">Talk To Us</span>
                                    <span className="text-gray-600 text-sm">0450 010 419</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Victorian Rebates Breakdown Section - NEW */}
            <section className="py-16 bg-[#062d16]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How the Victorian Solar Rebate Works</h2>
                        <p className="text-gray-300 text-lg">Victoria offers Australia's most generous solar rebates. Here's how to maximize your savings.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="inline-block bg-primary px-6 py-3 rounded-full mb-4">
                                <span className="text-2xl font-bold text-black">💰 VICTORIAN SOLAR REBATE BREAKDOWN</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <span className="text-gray-700 font-medium">Solar Victoria Rebate</span>
                                <span className="text-2xl font-bold text-[#062d16]">Up to $1,400</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <span className="text-gray-700 font-medium">Interest-Free Loan</span>
                                <span className="text-2xl font-bold text-[#062d16]">Up to $1,400</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <span className="text-gray-700 font-medium">Federal STCs (applied at sale)</span>
                                <span className="text-2xl font-bold text-[#062d16]">~$2,000-$3,000</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 bg-primary/10 -mx-4 px-4 py-4 rounded-xl">
                                <span className="text-xl font-bold text-black">TOTAL SAVINGS</span>
                                <span className="text-3xl font-bold text-[#062d16]">$4,000 - $6,000+</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="font-bold text-lg mb-4 text-black">How It Works:</h3>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold">1</span>
                                    <div>
                                        <strong className="text-black">We Apply for You</strong> – Pure Planet handles all the Solar Victoria paperwork. No confusing forms for you to fill out.
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold">2</span>
                                    <div>
                                        <strong className="text-black">Rebate Applied Upfront</strong> – The $1,400 comes off your quote price immediately. You never have to pay it and wait for reimbursement.
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold">3</span>
                                    <div>
                                        <strong className="text-black">Interest-Free Loan Option</strong> – Eligible homeowners can access an additional $1,400 interest-free loan, repaid over 4 years at just $29.17/month.
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-sm font-bold">4</span>
                                    <div>
                                        <strong className="text-black">$0 Upfront Available</strong> – For qualifying customers, we can structure your purchase so you pay nothing upfront and still save on power from day one.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4 text-black">Eligibility Requirements:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-xs mt-0.5">✓</span>
                                    <span>Own and live in the property</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-xs mt-0.5">✓</span>
                                    <span>Combined household income under $210,000</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-xs mt-0.5">✓</span>
                                    <span>Property value under $3 million</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-black text-xs mt-0.5">✓</span>
                                    <span>Haven't received a solar rebate at this address before</span>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/contact">
                                <button className="bg-[#062d16] text-white font-bold py-4 px-10 rounded-full hover:bg-primary hover:text-black transition-all duration-300 text-lg">
                                    Check My Eligibility
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Feature Banner Section - FIXED CONTENT */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl mb-12">
                        <Image src="/solar-planet/service-details-1-01.webp" alt="Solar Technician" fill className="object-cover" />
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-black">Why Melbourne Homeowners Are Switching to Solar</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                            Every year, thousands of Victorian families make the switch to solar power. With electricity prices rising 10-15% annually and solar panel costs dropping, the payback period has never been shorter—most systems pay for themselves in just 3-5 years.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Our solar panels are specifically selected for Melbourne's conditions. Modern N-Type cell technology captures more energy during grey winter mornings than older panels, meaning you generate power even when it's overcast.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            And with Victoria's generous rebate programs, eligible homeowners can access up to $1,400 off their system plus interest-free loans to cover the rest. Many customers end up paying less for their solar repayments than they were paying for electricity bills.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. Why Choose Solar - UPDATED */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Smart Investment</span>
                        <h3 className="text-3xl md:text-4xl font-bold font-display mb-8">Why Choose Solar Panels for Your Home?</h3>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "Slash Your Power Bills by 70-90%",
                                    desc: "Most Melbourne households see their electricity bills drop dramatically from the very first month after installation."
                                },
                                {
                                    title: "Lock In Your Energy Costs for 25 Years",
                                    desc: "While grid electricity rises 10-15% every year, your solar power is free. Your panels are warrantied to perform until at least 2050."
                                },
                                {
                                    title: "Get Paid for Excess Power",
                                    desc: "When your panels produce more than you use, the excess flows back to the grid and you receive a feed-in tariff credit on your bill."
                                },
                                {
                                    title: "Add a Battery Anytime",
                                    desc: "Our systems are designed to be 'battery-ready.' When you're ready to store power for nighttime use, adding a battery is simple."
                                },
                                {
                                    title: "Increase Your Home's Value",
                                    desc: "Studies show solar panels add $20,000-$30,000 to property values. Buyers want homes with lower running costs."
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
                        <Image src={detailsImg} alt="Solar Installation Team" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* System Sizing Guide - NEW SECTION */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-4">Which Solar System Size Is Right for You?</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Not sure how many panels you need? Here's a simple guide based on your quarterly electricity bill.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* The Starter */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-primary transition-all duration-300">
                            <div className="mb-6">
                                <div className="text-4xl mb-3">⚡</div>
                                <h3 className="text-2xl font-bold text-black mb-2">THE STARTER</h3>
                                <p className="text-xl font-bold text-primary">6.6kW System</p>
                                <p className="text-gray-600 text-sm">(16-18 panels)</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div>
                                    <p className="font-bold text-black text-sm mb-2">Best For:</p>
                                    <ul className="text-gray-600 text-sm space-y-1">
                                        <li>• Small families or retirees</li>
                                        <li>• Quarterly bills around $300-$400</li>
                                        <li>• Daytime energy users</li>
                                    </ul>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <p className="text-sm"><span className="font-bold text-black">Daily Output:</span> ~24kWh</p>
                                    <p className="text-sm"><span className="font-bold text-black">Covers:</span> TV, fridge, lights, washing machine</p>
                                </div>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-3 text-center">
                                <p className="text-sm font-bold text-black">💰 Most popular for rebate eligibility</p>
                            </div>
                        </div>

                        {/* The Family */}
                        <div className="bg-gradient-to-br from-[#062d16] to-[#0a4522] rounded-3xl p-8 shadow-xl border-2 border-primary transform md:-translate-y-4">
                            <div className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-bold text-black mb-4">
                                MOST POPULAR
                            </div>
                            <div className="mb-6">
                                <div className="text-4xl mb-3">⚡</div>
                                <h3 className="text-2xl font-bold text-white mb-2">THE FAMILY</h3>
                                <p className="text-xl font-bold text-primary">10kW System</p>
                                <p className="text-gray-300 text-sm">(22-26 panels)</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div>
                                    <p className="font-bold text-white text-sm mb-2">Best For:</p>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Growing families</li>
                                        <li>• Homes with pool pump or ducted AC</li>
                                        <li>• Quarterly bills around $500-$700</li>
                                    </ul>
                                </div>
                                <div className="border-t border-gray-600 pt-3">
                                    <p className="text-sm text-gray-200"><span className="font-bold text-white">Daily Output:</span> ~36kWh</p>
                                    <p className="text-sm text-gray-200"><span className="font-bold text-white">Covers:</span> All appliances running simultaneously</p>
                                </div>
                            </div>
                            <div className="bg-primary rounded-xl p-3 text-center">
                                <p className="text-sm font-bold text-black">🏠 Best value for medium-large homes</p>
                            </div>
                        </div>

                        {/* The Future-Proof */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-primary transition-all duration-300">
                            <div className="mb-6">
                                <div className="text-4xl mb-3">⚡</div>
                                <h3 className="text-2xl font-bold text-black mb-2">THE FUTURE-PROOF</h3>
                                <p className="text-xl font-bold text-primary">13kW+ System</p>
                                <p className="text-gray-600 text-sm">(30+ panels)</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div>
                                    <p className="font-bold text-black text-sm mb-2">Best For:</p>
                                    <ul className="text-gray-600 text-sm space-y-1">
                                        <li>• Large homes or home offices</li>
                                        <li>• EV owners or planning to buy one</li>
                                        <li>• Quarterly bills $800+</li>
                                    </ul>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <p className="text-sm"><span className="font-bold text-black">Daily Output:</span> ~48kWh+</p>
                                    <p className="text-sm"><span className="font-bold text-black">Covers:</span> Everything + EV charging + future battery</p>
                                </div>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-3 text-center">
                                <p className="text-sm font-bold text-black">🔋 Maximum roof coverage for long-term savings</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-6 text-lg">
                            Not sure which size? Our free consultation includes an energy assessment to recommend the perfect system for your household.
                        </p>
                        <Link href="/contact">
                            <button className="bg-primary text-black font-bold py-4 px-8 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                Get Your Free Assessment
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Technology Spotlight - NEW SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-4">Not All Solar Panels Are Created Equal</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            We only install premium Tier-1 panels with proven technology. Here's what sets our systems apart from "cheap solar" installers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-black mb-3">N-Type Cell Technology</h3>
                            <p className="text-primary font-bold text-lg mb-4">Better Performance in Low Light</p>
                            <p className="text-gray-600 leading-relaxed">
                                We use modern N-Type solar cells that degrade slower and capture more energy during Melbourne's grey winter mornings. While older P-Type panels lose efficiency over time, N-Type maintains higher output for 25+ years.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-black mb-3">Tier-1 Manufacturers Only</h3>
                            <p className="text-primary font-bold text-lg mb-4">Warranties You Can Trust</p>
                            <p className="text-gray-600 leading-relaxed">
                                We exclusively install panels from <strong>Jinko</strong>, <strong>Canadian Solar</strong>, and <strong>REC</strong>. These are global solar giants with Australian offices—they'll still be here in 25 years to honor your warranty. Beware of cheap panels from manufacturers who may not exist in 5 years.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-black mb-3">Microinverter Options</h3>
                            <p className="text-primary font-bold text-lg mb-4">Shade Protection for Complex Roofs</p>
                            <p className="text-gray-600 leading-relaxed">
                                Have a chimney, antenna, or trees causing partial shade? We offer <strong>Enphase Microinverters</strong> so one shaded panel doesn't drag down your entire system. Each panel operates independently for maximum energy harvest.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-black mb-3">Premium Inverters</h3>
                            <p className="text-primary font-bold text-lg mb-4">The Brain of Your System</p>
                            <p className="text-gray-600 leading-relaxed">
                                We partner with <strong>Fronius</strong>, <strong>SMA</strong>, and <strong>Sungrow</strong> for inverters—the component that converts DC power to usable AC electricity. Cheap inverters fail early. Ours are warrantied for 10-12 years.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Process - UPDATED */}
            <section className="py-24 bg-white">
                <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-black font-bold text-sm uppercase tracking-wide block mb-3">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">Our Solar Installation Process</h2>
                        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                            We follow a structured, compliant installation process to ensure safety, optimal performance, and long-term reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Free Consultation & Energy Assessment",
                                desc: "We analyze your electricity bills, roof space, orientation, and shading to design the optimal system. This visit is free with no obligation.",
                                icon: (
                                    <svg width="80" height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                                        <path d="M75.3125 25.7463H51.5625V16.3713C51.5625 13.7865 49.4598 11.6838 46.875 11.6838H4.6875C2.10266 11.6838 0 13.7865 0 16.3713V49.1838C0 51.7687 2.10266 53.8713 4.6875 53.8713H7.03186L7.03125 65.5901C7.03125 67.6799 9.55566 68.7084 11.0236 67.2557C25.3223 53.1078 24.4232 54.0056 24.5355 53.8713H28.4375V63.2463C28.4375 65.8312 30.5402 67.9338 33.125 67.9338L55.4651 67.9344C55.5756 68.0669 54.6771 67.1691 68.9764 81.3182C70.4462 82.7721 72.9688 81.7369 72.9688 79.6526L72.9681 67.9338H75.3125C77.8973 67.9338 80 65.8312 80 63.2463V30.4338C80 27.849 77.8973 25.7463 75.3125 25.7463ZM21.0199 50.7708L11.7194 59.9736V53.8713C11.7194 51.2865 9.6167 49.1838 7.03186 49.1838H4.6875V16.3713H46.875L46.8781 49.1838C46.8768 49.1838 24.5367 49.1838 24.5355 49.1838C23.1842 49.1838 21.9104 49.7606 21.0199 50.7708ZM75.3125 63.2463H72.9681C70.3833 63.2463 68.2806 65.349 68.2806 67.9344V74.0361L58.9801 64.8333C58.0896 63.8231 56.8158 63.2463 55.4651 63.2463H33.125V53.8713H46.875C49.4598 53.8713 51.5625 51.7687 51.5625 49.1838V30.4338H75.3125V63.2463Z" fill="currentColor" />
                                        <path d="M11.7188 30.4338H30.4688C31.7633 30.4338 32.8125 29.3846 32.8125 28.0901C32.8125 26.7955 31.7633 25.7463 30.4688 25.7463H11.7188C10.4242 25.7463 9.375 26.7955 9.375 28.0901C9.375 29.3846 10.4242 30.4338 11.7188 30.4338Z" fill="currentColor" />
                                        <path d="M39.8438 35.1213H11.7188C10.4242 35.1213 9.375 36.1705 9.375 37.4651C9.375 38.7596 10.4242 39.8088 11.7188 39.8088H39.8438C41.1383 39.8088 42.1875 38.7596 42.1875 37.4651C42.1875 36.1705 41.1383 35.1213 39.8438 35.1213Z" fill="currentColor" />
                                        <path d="M42.1875 28.0901C42.1875 29.3846 41.1383 30.4338 39.8438 30.4338C38.5492 30.4338 37.5 29.3846 37.5 28.0901C37.5 26.7955 38.5492 25.7463 39.8438 25.7463C41.1383 25.7463 42.1875 26.7955 42.1875 28.0901Z" fill="currentColor" />
                                    </svg>
                                )
                            },
                            {
                                title: "Custom System Design",
                                desc: "Your solar system is designed for maximum efficiency using satellite imagery and energy modeling. We show you exactly how much you'll generate and save.",
                                icon: (
                                    <svg width="80" height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                                        <g clipPath="url(#clip0_315_4319)">
                                            <path d="M18.553 18.7108C19.0685 19.5479 19.9632 20.009 20.8791 20.009C21.3673 20.009 21.8617 19.8778 22.3077 19.6032C23.5909 18.8127 23.9905 17.1317 23.2 15.8485L21.1515 12.5227C20.3611 11.2394 18.6799 10.8401 17.3968 11.6303C16.1135 12.4208 15.714 14.1018 16.5044 15.385L18.553 18.7108Z" fill="currentColor" />
                                            <path d="M9.18704 53.6418L5.72464 55.5538C4.40531 56.2824 3.92638 57.9426 4.65509 59.2619C5.15275 60.163 6.08489 60.6722 7.04644 60.6722C7.49255 60.6722 7.94495 60.5626 8.36317 60.3316L11.8256 58.4196C13.1449 57.691 13.6238 56.0308 12.8951 54.7115C12.1665 53.3922 10.5066 52.9132 9.18704 53.6418Z" fill="currentColor" />
                                            <path d="M34.9301 16.4611C36.4373 16.4611 37.659 15.2394 37.659 13.7322V9.63881C37.659 8.13163 36.4373 6.90991 34.9301 6.90991C33.4229 6.90991 32.2012 8.13163 32.2012 9.63881V13.7322C32.2012 15.2392 33.4229 16.4611 34.9301 16.4611Z" fill="currentColor" />
                                            <path d="M9.55129 41.8402C9.55129 40.333 8.32957 39.1113 6.82239 39.1113H2.7289C1.22172 39.1113 0 40.333 0 41.8402C0 43.3474 1.22172 44.5691 2.7289 44.5691H6.82225C8.32957 44.5693 9.55129 43.3476 9.55129 41.8402Z" fill="currentColor" />
                                            <path d="M32.4835 57.4804C32.3274 57.4561 32.1722 57.4298 32.0176 57.401C24.5342 56.0105 19.1025 49.4661 19.1025 41.8401C19.1025 33.989 24.9548 27.2504 32.7161 26.1656C32.9078 26.1386 33.1034 26.1151 33.2978 26.0952C34.7972 25.9418 35.8882 24.6022 35.7351 23.1027C35.5817 21.6034 34.2419 20.512 32.7426 20.6655C32.4813 20.6922 32.218 20.724 31.9602 20.7601C26.9214 21.4645 22.2907 23.9688 18.921 27.8118C15.5183 31.6923 13.6445 36.6742 13.6445 41.8401C13.6445 52.0952 20.9523 60.8963 31.0204 62.767C31.2261 62.8052 31.4368 62.8411 31.6461 62.8737C31.788 62.8958 31.9289 62.9065 32.0682 62.9065C33.3906 62.9063 34.5523 61.9432 34.7615 60.5958C34.9926 59.1064 33.9728 57.7117 32.4835 57.4804Z" fill="currentColor" />
                                            <path d="M69.425 37.0486C68.3856 34.7859 66.1634 33.3803 63.6255 33.3803H58.7198L69.5991 15.274C70.1057 14.431 70.1194 13.3806 69.6351 12.5247C69.1508 11.6689 68.2433 11.1396 67.26 11.1396H51.0311C50.06 11.1396 49.1622 11.6558 48.6733 12.4945L32.759 39.8038C32.7461 39.8258 32.7337 39.8478 32.7217 39.8702C31.323 42.4323 31.3774 45.4606 32.867 47.9708C34.3565 50.4811 36.9886 51.9798 39.9076 51.9798H42.5776L35.683 71.183C35.1496 72.4509 35.241 73.7868 35.9399 74.8673C36.7114 76.0603 38.1259 76.7707 39.727 76.7707C39.7342 76.7707 39.7413 76.7707 39.7484 76.7707C41.1084 76.7653 42.4229 76.2261 43.3551 75.2912C43.4375 75.2085 43.5146 75.1208 43.5859 75.0281L58.5017 55.6318C59.4205 54.437 59.1968 52.7237 58.002 51.8051C56.8072 50.8862 55.0939 51.1098 54.1753 52.3048L43.0794 66.7332L49.0251 50.1732C49.3253 49.3372 49.1997 48.4075 48.6886 47.6808C48.1774 46.9543 47.3449 46.522 46.4565 46.522H39.9072C38.5047 46.522 37.7988 45.5875 37.5603 45.1857C37.3236 44.787 36.8473 43.7328 37.4965 42.5137L52.5993 16.5976H62.4367L51.5574 34.704C51.0508 35.547 51.0371 36.5973 51.5214 37.4533C52.0057 38.3093 52.9132 38.8384 53.8965 38.8384H63.6255C64.1609 38.8384 64.3814 39.1445 64.4652 39.3269C64.5634 39.5405 64.6137 39.8723 64.2969 40.241C64.2901 40.2489 64.2834 40.2569 64.2767 40.2648L63.1563 41.5998C62.1874 42.7542 62.3379 44.4756 63.4923 45.4445C64.6468 46.4134 66.3681 46.2629 67.337 45.1084L68.4485 43.7841C70.0819 41.8726 70.4561 39.2937 69.425 37.0486Z" fill="currentColor" />
                                            <path d="M12.1368 24.6002L8.80577 22.6899C7.49846 21.9403 5.83063 22.3922 5.08087 23.6996C4.33111 25.007 4.7831 26.6747 6.09054 27.4245L9.42168 29.3347C9.84975 29.5801 10.3164 29.6969 10.7767 29.6969C11.7225 29.6968 12.6422 29.2043 13.1466 28.3251C13.8963 27.0176 13.4442 25.3499 12.1368 24.6002Z" fill="currentColor" />
                                            <path d="M21.4329 63.4978C20.1313 62.7385 18.4602 63.1775 17.7003 64.4792L15.7064 67.8954C14.9468 69.1971 15.3861 70.8682 16.6878 71.6279C17.1204 71.8803 17.5937 72.0005 18.0609 72.0005C18.9993 72.0005 19.913 71.5158 20.4203 70.6467L22.4142 67.2305C23.1739 65.9287 22.7346 64.2576 21.4329 63.4978Z" fill="currentColor" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_315_4319">
                                                <rect width="70" height="70" fill="white" transform="translate(0 6.84009)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )
                            },
                            {
                                title: "Rebate & Paperwork Handling",
                                desc: "We apply for the $1,400 Victorian Solar Rebate on your behalf and handle all permits, grid connection applications, and compliance paperwork.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Professional Installation",
                                desc: "CEC-accredited electricians install your panels—typically completed in one day. We use proper safety equipment and protect your roof throughout.",
                                icon: (
                                    <svg width="80" height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                                        <g clipPath="url(#clip0_315_4362)">
                                            <path d="M74.9388 68.081L69.47 46.206C69.2419 45.2931 68.4216 44.6526 67.4805 44.6526H12.5196C11.5785 44.6526 10.7582 45.2931 10.5301 46.206L5.0613 68.081C4.90804 68.6936 5.04572 69.3428 5.43441 69.8404C5.8231 70.3382 6.41933 70.6292 7.05083 70.6292H31.9201L30.1861 77.7385H26.3282C25.1956 77.7385 24.2774 78.6567 24.2774 79.7893C24.2774 80.9219 25.1956 81.8401 26.3282 81.8401H53.6719C54.8045 81.8401 55.7227 80.9219 55.7227 79.7893C55.7227 78.6567 54.8045 77.7385 53.6719 77.7385H49.8139L48.0799 70.6292H72.9493C73.5808 70.6292 74.177 70.3382 74.5657 69.8404C74.9544 69.3428 75.0921 68.6938 74.9388 68.081ZM42.0508 48.7542H51.93L52.7845 55.5901H42.0508V48.7542ZM28.0702 48.7542H37.9493V55.5901H27.2156L28.0702 48.7542ZM21.7152 66.5276H9.67747L11.3865 59.6917H22.5696L21.7152 66.5276ZM23.0823 55.5901H12.4118L14.1208 48.7542H23.9368L23.0823 55.5901ZM25.8486 66.5276L26.7031 59.6917H37.9493V66.5276H25.8486ZM34.4081 77.7385L36.1421 70.6292H43.8581L45.5921 77.7385H34.4081ZM42.0508 66.5276V59.6917H53.2972L54.1517 66.5276H42.0508ZM56.0633 48.7542H65.8793L67.5883 55.5901H56.9178L56.0633 48.7542ZM58.285 66.5276L57.4305 59.6917H68.6136L70.3226 66.5276H58.285Z" fill="currentColor" />
                                            <path d="M19.4922 36.4495H25.7985C25.9345 37.3718 26.1591 38.2864 26.477 39.1845C26.767 40.0035 27.5415 40.551 28.4104 40.551H51.5896C52.4584 40.551 53.233 40.0036 53.523 39.1845C53.8409 38.2864 54.0655 37.3716 54.2015 36.4495H60.5078C61.6404 36.4495 62.5586 35.5313 62.5586 34.3987C62.5586 33.2661 61.6404 32.3479 60.5078 32.3479H54.2084C53.8595 29.9194 52.9013 27.685 51.4929 25.806L55.9514 21.3476C56.7523 20.5469 56.7523 19.2483 55.9514 18.4474C55.1508 17.6467 53.8522 17.6465 53.0512 18.4474L48.5928 22.9058C46.7138 21.4975 44.4795 20.5392 42.0508 20.1903V13.8909C42.0508 12.7583 41.1326 11.8401 40 11.8401C38.8674 11.8401 37.9492 12.7583 37.9492 13.8909V20.1903C35.5207 20.5392 33.2863 21.4974 31.4074 22.9058L26.949 18.4474C26.1482 17.6465 24.8496 17.6465 24.0488 18.4474C23.2479 19.2483 23.2479 20.5467 24.0488 21.3476L28.5073 25.806C27.0989 27.685 26.1407 29.9194 25.7918 32.3479H19.4922C18.3596 32.3479 17.4414 33.2661 17.4414 34.3987C17.4414 35.5313 18.3596 36.4495 19.4922 36.4495ZM40 24.1448C45.654 24.1448 50.2539 28.7447 50.2539 34.3987C50.2539 35.0838 50.1823 35.7696 50.0402 36.4495H29.9599C29.8179 35.7696 29.7462 35.0838 29.7462 34.3987C29.7461 28.7447 34.346 24.1448 40 24.1448Z" fill="currentColor" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_315_4362">
                                                <rect width="70" height="70" fill="white" transform="translate(5 11.8401)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )
                            },
                            {
                                title: "Testing & Handover",
                                desc: "We thoroughly test the system, connect your monitoring app, and walk you through how to track your solar production and savings.",
                                icon: (
                                    <svg width="80" height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                                        <path d="M68.8477 14.0276H11.1523C7.76001 14.0276 5 16.7876 5 20.1799V61.1956C5 64.5879 7.76001 67.3479 11.1523 67.3479H28.9514L26.217 75.551H19.4922C18.3595 75.551 17.4414 76.4691 17.4414 77.6018C17.4414 78.7345 18.3595 79.6526 19.4922 79.6526H60.5078C61.6405 79.6526 62.5586 78.7345 62.5586 77.6018C62.5586 76.4691 61.6405 75.551 60.5078 75.551H53.783L51.0486 67.3479H68.8477C72.24 67.3479 75 64.5879 75 61.1956V20.1799C75 16.7876 72.24 14.0276 68.8477 14.0276ZM30.5408 75.551L33.2751 67.3479H46.7249L49.4592 75.551H30.5408ZM70.8984 61.1956C70.8984 62.3262 69.9783 63.2463 68.8477 63.2463C62.8892 63.2463 17.1728 63.2463 11.1523 63.2463C10.0217 63.2463 9.10156 62.3262 9.10156 61.1956V59.1448H70.8984V61.1956ZM27.3642 43.2566L25.4987 41.3916L28.3987 38.4912L30.2641 40.3566C30.9253 41.0178 31.9501 41.1481 32.756 40.6728C33.9085 39.9935 35.139 39.4813 36.4127 39.1513C37.3174 38.9173 37.9492 38.1008 37.9492 37.1662V34.5354H42.0508V37.1662C42.0508 38.1008 42.6826 38.9173 43.5873 39.1513C44.8605 39.4813 46.0909 39.9935 47.2434 40.6733C48.0493 41.1481 49.0742 41.0178 49.7353 40.3566L51.6008 38.4912L54.5013 41.3916L52.6358 43.2571C51.9746 43.9183 51.8443 44.9431 52.3196 45.7485C52.9995 46.9015 53.5111 48.132 53.8412 49.4052C54.0751 50.3099 54.8917 50.9417 55.8263 50.9417H58.457V55.0432H50.0467C50.1834 54.3714 50.2539 53.684 50.2539 52.9924C50.2539 47.3384 45.6541 42.7385 40 42.7385C34.3459 42.7385 29.7461 47.3384 29.7461 52.9924C29.7461 53.684 29.8166 54.3714 29.9533 55.0432H21.543V50.9417H24.1737C25.1083 50.9417 25.9249 50.3099 26.1594 49.4052C26.4889 48.132 27.001 46.9015 27.6804 45.7485C28.1551 44.9431 28.0254 43.9183 27.3642 43.2566ZM46.1523 52.9924C46.1523 53.6947 46.0306 54.3885 45.7999 55.0432H34.2001C33.9694 54.3885 33.8477 53.6947 33.8477 52.9924C33.8477 49.6001 36.6077 46.8401 40 46.8401C43.3923 46.8401 46.1523 49.6001 46.1523 52.9924ZM70.8984 55.0432H62.5586V48.8909C62.5586 47.7581 61.6405 46.8401 60.5078 46.8401H57.3398C57.1272 46.2441 56.8832 45.6582 56.6087 45.0841L58.8517 42.8416C59.6523 42.0405 59.6523 40.7422 58.8512 39.9411L53.0508 34.1407C52.6662 33.7562 52.1445 33.5405 51.6008 33.5405C51.0571 33.5405 50.5354 33.7562 50.1508 34.1407L47.9083 36.3838C47.3342 36.1093 46.7484 35.8652 46.1523 35.6532V32.4846C46.1523 31.3519 45.2343 30.4338 44.1016 30.4338H35.8984C34.7657 30.4338 33.8477 31.3519 33.8477 32.4846V35.6532C33.2516 35.8652 32.6658 36.1093 32.0917 36.3838L29.8492 34.1407C29.4646 33.7562 28.9429 33.5405 28.3992 33.5405C27.855 33.5405 27.3338 33.7562 26.9487 34.1407L21.1488 39.9411C20.3477 40.7422 20.3477 42.0405 21.1488 42.8416L23.3913 45.0846C23.1168 45.6582 22.8733 46.2441 22.6608 46.8401H19.4922C18.3595 46.8401 17.4414 47.7587 17.4414 48.8909V55.0432H9.10156V20.1799C9.10156 19.0493 10.0217 18.1292 11.1523 18.1292H68.8477C69.9783 18.1292 70.8984 19.0493 70.8984 20.1799V55.0432Z" fill="currentColor" />
                                    </svg>
                                )
                            },
                            {
                                title: "Ongoing Support",
                                desc: "Questions after installation? Our Melbourne-based support team is here to help. We're not a call center—we're the people who installed your system.",
                                icon: (
                                    <svg width="80" height="87" viewBox="0 0 80 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                                        <path d="M39.9978 62.2884C49.484 62.2884 57.2016 54.5725 57.2016 45.0883C57.1964 40.5271 55.3822 36.1542 52.157 32.929C48.9318 29.7038 44.5589 27.8896 39.9978 27.8844C30.5136 27.8844 22.7977 35.602 22.7977 45.0883C22.8051 49.4278 24.4461 53.6054 27.3942 56.7898L25.6151 63.427C25.51 63.8189 25.5236 64.2331 25.6539 64.6173C25.7843 65.0014 26.0258 65.3383 26.3476 65.5852C26.6695 65.8322 27.0574 65.9781 27.4623 66.0045C27.8671 66.031 28.2707 65.9367 28.6219 65.7338L35.5802 61.7131C37.0215 62.0959 38.5065 62.2893 39.9978 62.2884ZM34.2902 57.722L30.8597 59.7045L31.662 56.7117C31.7585 56.3519 31.7551 55.9727 31.6523 55.6147C31.5495 55.2567 31.3511 54.9334 31.0785 54.6796C29.7543 53.4587 28.6988 51.9754 27.9793 50.3242C27.2598 48.673 26.892 46.8901 26.8993 45.089C26.9002 42.3241 27.7764 39.6304 29.4022 37.394C31.028 35.1576 33.32 33.4932 35.9497 32.6394C38.5795 31.7855 41.412 31.786 44.0415 32.6407C46.671 33.4955 48.9624 35.1606 50.5874 37.3976C52.2125 39.6346 53.0877 42.3285 53.0878 45.0934C53.0878 47.8583 52.2126 50.5523 50.5876 52.7893C48.9627 55.0262 46.6713 56.6915 44.0418 57.5463C41.4124 58.4011 38.5798 58.4017 35.9501 57.5479C35.6767 57.4588 35.3876 57.4283 35.1016 57.4583C34.8157 57.4882 34.5392 57.5779 34.2902 57.7216V57.722Z" fill="currentColor" />
                                    </svg>
                                )
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-[#F4F9F4] rounded-xl p-8 flex flex-col items-center text-center gap-6 hover:shadow-lg transition-all duration-300">
                                <div className="text-black mb-2">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-3 leading-tight text-black">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed px-1">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Residential Solar */}
            <section className="py-24 bg-white">
                <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl group w-full">
                        <Image src="/solar-planet/Rectangle 11.webp" alt="Residential Solar Installation" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 leading-tight">
                            Custom Residential <br /> Solar Panel Systems
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Every home is different, and so is every solar system we install. At PurePlanet, our team designs tailored residential solar systems that align with your household's energy consumption and roof orientation.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We handle everything, from system design and installation to compliance and rebate guidance, so you can enjoy peace of mind and consistent energy savings.
                        </p>
                    </div>
                </div>
            </section>

            {/* Commercial Solar */}
            <section className="py-24 bg-white">
                <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-6 leading-tight">
                            Custom Commercial <br /> Solar Panel Systems
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            PurePlanet delivers tailored commercial solar solutions for Melbourne businesses, designed to reduce energy costs, improve efficiency, and support long-term sustainability. Our systems are professionally installed, fully compliant, and built to meet the unique demands of your operation.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl group w-full order-1 lg:order-2">
                        <Image src="/solar-planet/Rectangle 12.webp" alt="Commercial Solar Installation" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* 7. High-Efficiency Products */}
            <HighEfficiencySection />

            {/* FAQ - UPDATED */}
            <FAQ
                items={[
                    {
                        question: "Do solar panels work on cloudy Melbourne days?",
                        answer: "Yes! Modern panels rely on UV light, not direct heat. They generate significant power even on overcast days. Melbourne's annual sunlight levels (around 4.5 peak sun hours daily) are well-suited for solar. You'll produce more in summer, less in winter, but it averages out over the year."
                    },
                    {
                        question: "What size solar system do I need?",
                        answer: "It depends on your electricity usage. As a rough guide: 6.6kW for small homes/retirees ($300-400 quarterly bills), 10kW for families with AC or pool ($500-700 quarterly bills), and 13kW+ for large homes or EV owners ($800+ quarterly bills). Our free consultation includes an energy assessment to recommend the right size."
                    },
                    {
                        question: "Will you damage my roof tiles?",
                        answer: "We use non-penetrating mounting systems wherever possible. For tile roofs, we use tile replacement brackets that sit under existing tiles. We carry spare tiles to every job—if we break one, we replace it immediately at no cost."
                    },
                    {
                        question: "How long does installation take?",
                        answer: "Most residential systems are installed in one day (5-8 hours). Larger systems or complex roofs may require two days. We minimize disruption and clean up completely."
                    },
                    {
                        question: "What happens during a power outage?",
                        answer: "Standard solar systems shut down during blackouts for safety reasons (to protect workers repairing power lines). If you want backup power during outages, you'll need a battery with backup capability—ask us about options."
                    },
                    {
                        question: "How long do solar panels last?",
                        answer: "Your panels are warrantied to produce at least 80% of their original output after 25 years, but most panels last 30-40 years. The inverter typically needs replacement after 10-15 years."
                    },
                    {
                        question: "Do you help with the rebate paperwork?",
                        answer: "Absolutely. We handle the entire Solar Victoria rebate application on your behalf. The $1,400 rebate is applied directly to your quote—you never have to pay it and wait for reimbursement."
                    },
                    {
                        question: "Can I add a battery later?",
                        answer: "Yes! All our systems are 'battery-ready.' When battery prices drop further or you want to store solar power for nighttime use, adding a battery is straightforward. We'll design your system with future expansion in mind."
                    }
                ]}
            />

            {/* CTA Section - UPDATED */}
            <section className="py-24 bg-primary">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-6">Ready to Cut Your Power Bills?</h2>
                    <p className="text-black/80 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
                        Join thousands of Melbourne homeowners already saving with solar. With the $1,400 Victorian rebate and interest-free loans available, the average household saves $1,200-$1,800 per year on electricity.
                    </p>
                    <div className="bg-black/10 rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
                        <p className="text-black font-bold mb-4">Your free consultation includes:</p>
                        <div className="grid md:grid-cols-2 gap-3 text-left text-black">
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-black text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                <span className="text-sm">Energy usage analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-black text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                <span className="text-sm">Custom system recommendation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-black text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                <span className="text-sm">Exact quote with rebates applied</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-black text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                                <span className="text-sm">Savings projection over 25 years</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-black/80 mb-8 text-lg">No pressure, no obligation. Just honest advice from local solar experts.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get Your Free Quote
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <a href="tel:0450010419" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-black hover:text-white transition-all shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                            </svg>
                            Call 0450 010 419
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
