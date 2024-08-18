import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaCashRegister,
  FaChevronUp,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-10 mt-20 lg:mt-32">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 justify-between mx-auto mb-8 lg:mb-16 max-w-[1300px] px-4">
        <div className="mb-8 min-w-[200px] pr-5 col-span-2">
          <Link href="/#" className="max-w-[200px] flex items-end gap-2 mb-4">
            <Image width={300} height={300} src="/logo.svg" alt="logo" className="h-9 w-9" />
            <h1 className="text-3xl font-bold text-white">Kimih</h1>
          </Link>
          <div className="social-icons flex gap-10 mt-8 p-2">
            <Link
              href="https://www.linkedin.com/company/kimih"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white text-3xl transition-all duration-300 ease-in-out hover:text-themeVilot"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://twitter.com/kimih"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white text-3xl transition-all duration-300 ease-in-out hover:text-themeVilot"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://www.facebook.com/kimih"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white text-3xl transition-all duration-300 ease-in-out hover:text-themeVilot"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://www.instagram.com/kimih"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white text-3xl transition-all duration-300 ease-in-out hover:text-themeVilot"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className="mb-8 max-w-[350px] pr-5 col-span-2">
          <p className="text-lg font-semibold mb-4">
            Kimih Information Technology CO. L.L.C
          </p>
          <p className="flex items-center mb-4">
            <FaCashRegister className="text-white mr-2" />
            Registration no: 2361735
          </p>
          <p className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-white mr-2" />
            Office 43-44, Building of Dubai Municipality, UAE
          </p>
          {/* <p className="flex items-center mb-4">
            <FaPhone className="text-white mr-2" />
            +1 (555) 123-4567
          </p> */}
          <p className="flex items-center mb-4">
            <FaEnvelope className="text-white mr-2" />
            Info@kimih.com
          </p>
        </div>
        <div className="mb-8 min-w-[200px] pr-5">
          <h1 className="text-lg font-bold mb-4">For Business</h1>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link
                href="#services"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                Support
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/about"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                Partrners Terms
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="#case-studies"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                FAQ
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-8 min-w-[200px] pr-5">
          <h1 className="text-lg font-bold mb-4">About Kimih</h1>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link
                href="#services"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                About us
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/about"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                Terms & conditions
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="#case-studies"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                Privacy Policy
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
                  →
                </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="#blog"
                className="relative text-white transition-all duration-300 ease-in-out hover:text-themeVilot hover:pl-5"
              >
                Cancellation Policy
                <span className="absolute left-[-20px] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:left-0">
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
            href="#privacy-policy"
            className="text-white transition-all duration-300 ease-in-out hover:text-themeVilot"
          >
            Privacy Policy
          </Link>
          <Link
            href="#terms-of-service"
            className="text-white transition-all duration-300 ease-in-out hover:text-themeVilot ml-4"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
