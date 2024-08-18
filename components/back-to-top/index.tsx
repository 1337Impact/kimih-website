"use client";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    () => window.removeEventListener("scroll", () => {});
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`${
        show || "hidden"
      } fixed z-20 bottom-10 right-10 bg-gradient-to-tr from-themeVilot to-themeBlue text-2xl text-white p-3 rounded-full transition-all duration-300 ease-in-out hover:opacity-90 hover:transform hover:-translate-y-1`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <FaChevronUp />
    </button>
  );
}
