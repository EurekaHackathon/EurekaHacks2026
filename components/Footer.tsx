import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto px-6 bg-transparent border-t border-white/10 text-white/70 text-sm z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.webp" 
              alt="EurekaHACKS Logo" 
              width={40} 
              height={40} 
              className="rounded-md" 
            />
            <span className="font-bold text-xl text-white font-righteous tracking-wide">
              EUREKAHACKS
            </span>
          </Link>
          <p>Copyright © EurekaHACKS 2026</p>
        </div>
        
        {/* Connect With Us */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="font-semibold text-white/90 text-base mb-1">Connect With Us</h3>
          <a href="mailto:hello@eurekahacks.ca" className="hover:text-white transition-colors">
            hello@eurekahacks.ca
          </a>
          <a href="https://instagram.com/eureka_hacks" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="font-semibold text-white/90 text-base mb-1">Legal</h3>
          <Link href="/code-of-conduct" className="hover:text-white transition-colors">
            Code of Conduct
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
