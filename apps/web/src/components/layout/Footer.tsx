import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="#hero" className="text-2xl font-bold text-white tracking-widest uppercase mb-4 block">
            KTM
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Experience the future of motorcycle retail. Explore our premium inventory through an immersive 3D digital showroom.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#catalog" className="hover:text-white transition-colors">All Bikes</Link></li>
            <li><Link href="#offers" className="hover:text-white transition-colors">Special Offers</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">Book Test Ride</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>123 Dealership Road, Tech City</li>
            <li>hello@ktm.com</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} KTM. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
