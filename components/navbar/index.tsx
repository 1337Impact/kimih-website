"use client";
import { use, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    name: "For Business",
    href: "/business",
    id: "business",
  },
  {
    name: "Support",
    href: "/support",
    id: "support",
  },
  {
    name: "About",
    href: "/about",
    id: "about",
  },
  {
    name: "FAQ",
    href: "/faq",
    id: "faq",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/blog")) {
      setActiveSection("blog");
      return;
    }
    const sections = document.querySelectorAll("section");
    console.log("sections: ", sections);
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed bg-white z-[100] w-full h-[80px] mx-auto text-slate-700">
      <div className="relative flex h-full w-full items-center justify-between px-4 max-w-[1300px] mx-auto">
        <Link href="/#" className="flex items-center gap-1">
          <img alt="logo" src="/logo.svg" className="h-9" />
          <h1 className="text-xl font-bold text-black">Kimih</h1>
        </Link>
        <nav
          className={`${
            !isMenuOpen && "max-md:hidden"
          } max-md:absolute z-40 flex right-0 top-[70px] max-md:w-full max-md:h-[400px] max-md:shadow-md max-md:bg-gray-100 max-md:rounded-md items-center max-md:justify-around font-semibold max-md:flex-col max-md:text-xl md:gap-4 lg:gap-8 xl:gap-10`}
        >
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  activeSection === link.id && "text-themeVilot"
                } cursor-pointer hover:text-themeVilot`}
              >
                {link.name}
              </div>
              <div
                className={`${
                  activeSection !== link.id && "hidden"
                } w-full h-[2.4px] bg-themeVilottext-themeVilot hover:bg-themeVilottext-themeVilot`}
              />
            </Link>
          ))}

          <Link href={"/login"} className="md:hidden">
            <div
              onClick={() => setIsMenuOpen(false)}
              className="float-right text-black hover:text-gray-700 font-bold px-4 py-2 rounded-md cursor-pointer"
            >
              Log in
            </div>
          </Link>
          <Link href={"/signup"} className="md:hidden">
            <div
              onClick={() => setIsMenuOpen(false)}
              className="float-right bg-gradient-to-tr from-themeBlue to-themeVilot hover:from-themeVilot hover:to-themeBlue text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              Sign up
            </div>
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <button
            name="menu"
            type="button"
            aria-label="menu"
            className={`${styles.hamburger} md:hidden z-50`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`${styles.line} ${isMenuOpen && styles.open}`}
            ></div>
            <div
              className={`${styles.line} ${isMenuOpen && styles.open}`}
            ></div>
            <div
              className={`${styles.line} ${isMenuOpen && styles.open}`}
            ></div>
          </button>
          <Link href={"/login"} className="max-md:hidden">
            <div
              onClick={() => setIsMenuOpen(false)}
              className="float-right text-black hover:text-gray-700 font-bold px-4 py-2 rounded-md cursor-pointer"
            >
              Log in
            </div>
          </Link>
          <Link href={"/signup"} className="max-md:hidden">
            <div
              onClick={() => setIsMenuOpen(false)}
              className="float-right bg-gradient-to-tr from-themeBlue to-themeVilot hover:opacity-90 text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
