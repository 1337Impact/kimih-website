import Image from "next/image";
import Link from "next/link";
import { Landmark, Mail, MapPin } from "lucide-react";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white transition-all duration-300 ease-in-out hover:text-violet-400"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full relative bg-gray-900 text-white py-10 mt-20 lg:mt-32 overflow-hidden">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 justify-between mx-auto mb-8 lg:mb-16 max-w-[1300px] px-4">
        <div className="mb-8 min-w-[180px] pr-5 col-span-2">
          <Link href="/#" className="max-w-[190px] flex items-end gap-2 mb-4">
            <Image
              width={36}
              height={36}
              src="/logo.svg"
              alt="logo"
              className="h-9 w-9"
            />
            <span className="notranslate text-3xl font-bold text-white">Kimih</span>
          </Link>
          <div className="social-icons flex gap-10 mt-8 p-2">
            <SocialIcon href="https://www.linkedin.com/company/kimih" label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://x.com/KimihCo" label="Twitter">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
                <path d="M18.24 2H21l-6.52 7.45L22.5 22h-6.17l-4.83-6.32L6.3 22H3.52l6.97-7.97L1.5 2h6.32l4.36 5.8L18.24 2zm-1.08 18h1.71L7.01 3.9H5.18L17.16 20z" />
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://www.facebook.com/share/xTL8fWj5hV34izC2/?mibextid=LQQJ4d"
              label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
                <path d="M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24h11.5v-9.29H9.69V11.1h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.79.72-1.79 1.76v2.31h3.59l-.47 3.61h-3.12V24h6.12c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/kimihco" label="Instagram">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
        <div className="mb-8 max-w-[350px] pr-5 col-span-2">
          <p className="text-lg font-semibold mb-4">
            Kimih Information Technology CO. L.L.C
          </p>
          <p className="flex items-center mb-4">
            <Landmark className="text-white mr-2" size={18} />
            Registration no: 2361735
          </p>
          <p className="flex items-center mb-4">
            <MapPin className="text-white mr-2" size={18} />
            Office 43-44, Building of Dubai Municipality, UAE
          </p>
          <p className="flex items-center mb-4 notranslate">
            <Mail className="text-white mr-2" size={18} />
            Info@kimih.com
          </p>
        </div>
        <div className="mb-8 min-w-[200px] pr-5">
          <h2 className="text-lg font-bold mb-4">For Business</h2>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link
                href="/support"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                Support
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/partner-terms"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                Partrners Terms
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/faq"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                FAQ
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-8 min-w-[200px] pr-5">
          <h2 className="text-lg font-bold mb-4">About Kimih</h2>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link
                href="/about"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                About us
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/terms-and-conditions"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                Terms & conditions
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/privacy-policy"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                Privacy Policy
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/cancellation-policy"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-violet-400 hover:pl-5 group"
              >
                Cancellation Policy
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-0">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 pt-5 border-t border-[rgba(255,255,255,0.1)] relative z-10">
        <p className="mb-2 text-sm">
          &copy; 2024 Kimih.com - All rights reserved.
        </p>
        <nav className="footer-nav">
          <Link
            href="/privacy-policy"
            className="text-white transition-all duration-300 ease-in-out hover:text-violet-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-white transition-all duration-300 ease-in-out hover:text-violet-400 ml-4"
          >
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
