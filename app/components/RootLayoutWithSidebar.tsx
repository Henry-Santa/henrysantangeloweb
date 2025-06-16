"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function RootLayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col items-center bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200 transition-transform duration-300 md:static md:translate-x-0 md:w-60 w-60 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden mt-4 mb-8 p-2 rounded-full hover:bg-gray-200 transition self-end mr-4"
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <div className="flex flex-col items-center w-full px-4">
          <div className="mb-8 mt-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold select-none">HS</span>
          </div>
          <h2 className="text-lg font-semibold mb-8 tracking-wide text-gray-800">Menu</h2>
          <nav className="flex flex-col gap-2 w-full">
            <Link href="/creativewriting" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium transition">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              Creative Writing
            </Link>
            <Link href="https://github.com" target="_blank" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium transition">
              <span className="inline-block w-2 h-2 bg-gray-500 rounded-full"></span>
              GitHub
            </Link>
            <Link href="/junior-thesis" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium transition">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              Junior Thesis
            </Link>
          </nav>
        </div>
      </aside>
      {/* Open Sidebar Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-blue-500 hover:text-white transition border border-gray-300 md:hidden"
          aria-label="Open sidebar"
        >
          <FaBars size={22} />
        </button>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center ml-0 md:ml-60 transition-all duration-300 py-8 px-2">
        {children}
      </main>
    </div>
  );
}
