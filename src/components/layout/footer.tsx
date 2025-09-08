"use client";

import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#F2811D] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm mb-2 sm:mb-0">
          &copy; {currentYear} Slice & Spice
        </p>
        <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-primary"><Facebook size={18} /></Link>
            <Link href="#" className="hover:text-primary"><Instagram size={18} /></Link>
            <Link href="#" className="hover:text-primary"><Twitter size={18} /></Link>
            <span className="hidden sm:inline">|</span>
            <span className="text-sm">Contact: hello@sliceandspice.com</span>
        </div>
      </div>
    </footer>
  );
}
