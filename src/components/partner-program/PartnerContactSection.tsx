"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const faqData = [
    {
        question: "How does the partner program work?",
        answer: "Once approved, you'll receive project notifications based on your service areas and specializations. Each job comes with full specifications, customer details, and equipment requirements. You complete the installation, we handle the paperwork, and you get paid promptly. It's that simple."
    },
    {
        question: "What certifications do I need?",
        answer: "For Solar PV: Current SAA (formerly CEC) accreditation for grid-connected PV systems + valid Victorian REC licence. For Batteries: SAA battery installer accreditation + Victorian REC licence. For Heat Pumps: Registered plumber with VBA Certificate of Compliance capability + relevant manufacturer training (Reclaim, Stiebel Eltron, or Sanden). For All: Public liability insurance ($10M+) and workers compensation coverage."
    },
    {
        question: "Do I need to be registered with Solar Victoria?",
        answer: "Yes, for any Solar Homes Program installations. If you're not already registered, we can guide you through the process. You'll need to complete mandatory safety training and sign up via the Solar Victoria portal. It typically takes 1-2 weeks."
    },
    {
        question: "What products will I be installing?",
        answer: "We supply premium Tier-1 equipment: Solar Panels (Jinko Tiger Neo, Canadian Solar HiKu6, REC Alpha Pure, Trina Vertex), Inverters (Fronius, SMA, Sungrow, Enphase Microinverters), Batteries (Fox ESS, NeoVolt, Tesla Powerwall), Heat Pumps (Reclaim Energy CO₂, Stiebel Eltron, Sanden Eco Plus). All products are on the Solar Victoria approved lists and come with full manufacturer warranties."
    },
    {
        question: "How quickly will I get paid?",
        answer: "Payment is processed within 7 business days of job completion and sign-off. We don't hold your money—when the customer is happy and paperwork is complete, you get paid."
    },
    {
        question: "Is this a long-term partnership?",
        answer: "Absolutely. We're not looking for one-off subcontractors—we want reliable partners to grow with us. Top performers receive priority access to larger projects, commercial work, and new service territories. Many of our partners have been with us for years and built their businesses alongside ours."
    },
    {
        question: "Which areas do you cover?",
        answer: "We operate across all of Victoria: Metropolitan Melbourne (all suburbs), Mornington Peninsula, Geelong & Surf Coast, Gippsland, and Regional Victoria. We match jobs to your preferred service areas to minimize travel time and maximize your efficiency. You tell us where you want to work."
    },
    {
        question: "What if I have questions during an installation?",
        answer: "Our Victorian-based technical support team is available during business hours for design queries, product questions, and troubleshooting. You can also access manufacturer support directly for warranty issues. You're never left hanging on a job site."
    }
];

const PartnerContactSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-[#062d16] to-[#0a4522] text-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Join Our Network?</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
                        If you're an accredited solar, battery, or heat pump installer looking for steady work, competitive pricing, and full administrative support—we want to hear from you.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <Link href="/contact">
                            <button className="bg-primary text-secondary-dark font-bold py-4 px-10 rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2 text-base">
                                Get In Touch
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-secondary-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div className="leading-tight text-left">
                                <span className="block text-sm font-bold uppercase text-gray-400">Call Us</span>
                                <a href="tel:0450010419" className="block font-bold text-xl hover:text-primary transition">0450 010 419</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Styled like service pages */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-6">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'shadow-lg border-primary/30 bg-primary/5' : 'hover:border-primary/50'}`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full text-left px-8 py-6 flex items-center justify-between group"
                                    aria-expanded={activeIndex === index}
                                >
                                    <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-black group-hover:text-primary'}`}>
                                        {item.question}
                                    </span>
                                    <span className={`flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-current transition-transform duration-300 ${activeIndex === index ? 'rotate-180 bg-primary text-white border-primary' : 'text-gray-400 group-hover:text-primary group-hover:border-primary'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PartnerContactSection;
