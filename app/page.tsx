"use client";

import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import RootLayoutWithSidebar from "./components/RootLayoutWithSidebar";

export default function HomePage() {
  return (
    <RootLayoutWithSidebar>
      <h1 className="text-4xl font-bold text-center px-4">Welcome to My Website</h1>
    </RootLayoutWithSidebar>
  );
}
