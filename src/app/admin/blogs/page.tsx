'use client';

import { PenSquare } from 'lucide-react';

export default function BlogsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
        <p className="text-gray-500 mt-1">Manage blog posts</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
        <div className="text-center">
          <PenSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-gray-500">
            Blog management will be implemented in future phases
          </p>
        </div>
      </div>
    </div>
  );
}
