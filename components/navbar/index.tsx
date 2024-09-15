"use client";
import { use, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { getUserData, UserData } from "@/lib/getUserData";
import UserDropdownMenu from "../protected/user-dropdown/user-dropdown";
import LanguageSwitcher from "./language-switcher";

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
    name: "About us",
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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [userData, setUserData] = useState<UserData | null>();

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    setActiveSection(pathname.replace("/", ""));
  }, [pathname]);

  return (
    <header className="fixed bg-white z-[999] w-screen h-[80px] mx-auto text-slate-800">
      <div className="relative flex h-full w-full items-center justify-between px-4 max-w-[1300px] mx-auto">
        <Link href="/#" className="flex items-center gap-1">
          <Image
            width="300"
            height="300"
            alt="logo"
            src="/logo.svg"
            className="h-9 w-9"
          />
          <h1 className="notranslate text-xl font-bold text-black">Kimih</h1>
        </Link>
        <nav
          className={`${
            !isMenuOpen && "max-md:hidden"
          } max-md:absolute z-[999] flex right-0 top-[70px] max-md:w-full max-md:h-[400px] max-md:shadow-md max-md:bg-gray-100 max-md:rounded-md items-center max-md:justify-around font-semibold max-md:flex-col max-md:text-xl md:gap-4 lg:gap-8 xl:gap-10`}
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
          {userData ? (
            <Link href={"/profile"} className="md:hidden">
              <div
                onClick={() => setIsMenuOpen(false)}
                className="float-right text-black hover:text-gray-700 font-bold px-4 py-2 rounded-md cursor-pointer"
              >
                Profile
              </div>
            </Link>
          ) : (
            <>
              <Link href={"/auth"} className="md:hidden">
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="float-right text-black hover:text-gray-700 font-bold px-4 py-2 rounded-md cursor-pointer"
                >
                  Log in
                </div>
              </Link>
              <Link href={"/auth"} className="md:hidden">
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="float-right bg-gradient-to-tr from-themeBlue to-themeVilot hover:from-themeVilot hover:to-themeBlue text-white px-4 py-2 rounded-xl cursor-pointer"
                >
                  Sign up
                </div>
              </Link>
            </>
          )}
         <LanguageSwitcher />
        </nav>
        <button
          name="menu"
          type="button"
          aria-label="menu"
          className={`${styles.hamburger} md:hidden z-50`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`${styles.line} ${isMenuOpen && styles.open}`}></div>
          <div className={`${styles.line} ${isMenuOpen && styles.open}`}></div>
          <div className={`${styles.line} ${isMenuOpen && styles.open}`}></div>
        </button>
        <div className="max-md:hidden">
          {userData ? (
            <div className="px-4 relative">
              <UserDropdownMenu userData={userData} />
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href={"/auth"}>
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="float-right text-black hover:text-gray-700 font-bold px-4 py-2 rounded-md cursor-pointer"
                >
                  Log in
                </div>
              </Link>
              <Link href={"/auth"}>
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="float-right bg-gradient-to-tr from-themeBlue to-themeVilot hover:opacity-90 text-white px-4 py-2 rounded-xl cursor-pointer"
                >
                  Sign up
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
