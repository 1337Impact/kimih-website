import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import {
  applyGoogleTranslateLanguage,
  getStoredLanguage,
  loadGoogleTranslate,
} from "@/lib/load-google-translate";

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");

  const languages = [
    { code: "en", name: "EN" },
    { code: "ar", name: "AR" },
  ];

  const applyLanguage = async (languageCode) => {
    setCurrentLang(languageCode);
    localStorage.setItem("kimih-lang", languageCode);
    if (languageCode === "en" && !document.querySelector(".goog-te-combo")) {
      return;
    }
    await loadGoogleTranslate();
    applyGoogleTranslateLanguage(languageCode);
  };

  const handleLanguageChange = (e) => {
    applyLanguage(e.target.value);
  };

  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored && stored !== "en") {
      applyLanguage(stored);
    }
  }, []);

  return (
    <div className="notranslate flex items-center">
      <Languages size={20} />
      <select
        onChange={handleLanguageChange}
        className="focus-visible:outline-none pr-1 bg-transparent cursor-pointer"
        aria-label="Select Language"
        value={currentLang}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="px-2">
            {lang.name}
          </option>
        ))}
      </select>
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default LanguageSwitcher;
