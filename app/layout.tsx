import './globals.css';
import { ReactNode } from 'react';
// Importing the Google font via the built-in `next/font` optimisation gives us
// automatic CSS-inlining and subsetting with zero cumulative layout shift.
import { Nunito } from 'next/font/google';

/**
 * Global font setup – declare once and use throughout the app. The generated
 * className contains the necessary `font-face` rules which ensures that the
 * site ships only the characters we actually use.
 */
const nunito = Nunito({ subsets: ['latin'], weight: ['400','500','600','700'] });

export const metadata = {
  title: 'Henry Santangelo',
  description: 'Personal website for creative writing, projects, and more.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/*
        By setting `className` on the `<body>` we guarantee that Tailwind's
        reset and our global font applies to every route. We also plug in the
        Inter font class so that the font is eagerly loaded by Next.js.
      */}
      <body className={`${nunito.className} bg-[var(--background)] text-[var(--foreground)]`}>
        {children}
      </body>
    </html>
  );
}
