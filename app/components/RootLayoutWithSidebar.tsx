"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

/**
 * RootLayoutWithSidebar – ocean-palette v2
 */

export default function RootLayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Ensure legacy dark-mode class is removed
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const navItems = [
    { href: '/', label: 'Home', accent: 'bg-saffron-500' },
    { href: '/creativewriting', label: 'Creative Writing', accent: 'bg-keppel-500' },
    { href: 'https://github.com/henry-santa', label: 'GitHub', accent: 'bg-onyx-500', external: true },
    { href: '/Junior-Thesis.pdf', label: 'Junior Thesis', accent: 'bg-saffron-500' }
  ];

  return (
    <div className="flex min-h-screen bg-platinum text-onyx-500">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen md:h-auto z-30 flex flex-col justify-start md:justify-between items-center bg-timberwolf-500 shadow-xl border-r border-onyx-400 transition-transform duration-300 md:static md:translate-x-0 md:w-64 w-64 bg-white ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } animate-slideInLeft`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden mt-4 mb-4 p-2 rounded-full hover:bg-timberwolf-300 transition self-end mr-4"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <div className="flex flex-col items-center w-full px-4 pt-6 gap-6">
          {/* Avatar */}
          <div className="mb-8 mt-6">
            <Image src="/pfp.png" alt="Profile" width={80} height={80} className="rounded-full shadow-md" />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 w-full">
            {navItems.map(({ href, label, accent, external }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  className={`${isActive ? 'bg-keppel-100 font-semibold text-keppel-700' : 'text-onyx-700'} flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-timberwolf-300 transition`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${accent}`}></span>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-10 mb-6 text-xs text-onyx-600">Henry Santangelo</div>
        </div>
      </aside>

      {/* Open button (mobile) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-keppel-500 text-white rounded-full shadow-lg hover:bg-keppel-600 transition md:hidden"
          aria-label="Open sidebar"
        >
          <FaBars size={22} />
        </button>
      )}

      {/* Main */}
      <main className="flex-1 py-10 px-4 md:px-8 overflow-x-auto flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
