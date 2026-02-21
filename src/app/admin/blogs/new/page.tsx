'use client';

import { Construction, ArrowLeft, PaintBucket } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-[#C2F32C] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
                <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Construction size={64} className="text-[#062d16]" />
                </div>
                <div className="absolute -right-4 -top-4 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 animate-bounce delay-100">
                    <PaintBucket size={24} className="text-[#C2F32C] fill-current" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#062d16] to-[#0a4a25]">
                Blog Editor Coming Soon
            </h1>

            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                We're currently building a powerful blog editor to help you share news and updates.
                Stay tuned for features like rich text editing, image uploads, and SEO tools.
            </p>

            <Link
                href="/admin/blogs"
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl 
                 border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 
                 transition-all duration-200 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
            </Link>
        </div>
    );
}
