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
  metadataBase: new URL('https://henrysantangelo.com'),
  title: {
    template: '%s | Henry Santangelo',
    default: 'Henry Santangelo – Writer & Developer'
  },
  description: 'Portfolio and creative works of Henry Santangelo – author, developer, and lifelong learner.',
  keywords: [
    'Henry Santangelo',
    'Santangelo writing',
    'Henry Santangelo developer',
    'creative writing',
    'web projects',
    'personal blog',
    'github',
    'Santangelo Henry',
    'Santangelo'
  ],
  authors: [{ name: 'Henry Santangelo', url: 'https://henrysantangelo.com' }],
  openGraph: {
    title: 'Henry Santangelo – Writer & Developer',
    description: 'The stories and code projects of Henry Santangelo.',
    url: 'https://henrysantangelo.com',
    siteName: 'Henry Santangelo',
    images: [
      {
        url: '/pfp.png',
        width: 800,
        height: 800,
        alt: 'Henry Santangelo profile picture'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henry Santangelo – Writer & Developer',
    description: 'Official portfolio of Henry Santangelo',
    images: ['/pfp.png']
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Henry Santangelo',
              url: 'https://henrysantangelo.com',
              sameAs: ['https://github.com/henry-santa']
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
