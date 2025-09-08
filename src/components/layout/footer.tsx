import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pizza Brand</h3>
            <p className="text-sm text-neutral-400">&copy; 2024 Pizza Brand</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-primary">Help & Support</Link></li>
              <li><Link href="#" className="hover:text-primary">Partner with us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Social Links</h4>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-neutral-400 hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="text-neutral-400 hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-neutral-400 hover:text-primary"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
