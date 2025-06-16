import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Henry Santangelo',
  description: 'Personal website for creative writing, projects, and more.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
