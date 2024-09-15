import { useEffect, useState } from "react";
import { IoLanguage } from "react-icons/io5";

const LanguageSwitcher = () => {
  const [googleTranslateReady, setGoogleTranslateReady] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const languages = [
    { code: "en", name: "EN" },
    { code: "ar", name: "AR" },
  ];

  // Function to change the language
  const handleLanguageChange = (e) => {
    const languageCode = e.target.value;

    if (googleTranslateReady) {
      const googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        googleTranslateCombo.value = languageCode;
        setCurrentLang(languageCode);
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }
    }
  };

  // Activate Google Translate once the script is loaded
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const addScript = document.createElement("script");
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
        setGoogleTranslateReady(true); // Set flag to indicate that Google Translate is ready
      };
    };

    // Add the script if it hasn't been added yet
    if (
      !document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      addGoogleTranslateScript();
    }
  }, []);

  useEffect(() => {
    if (!googleTranslateReady) return;
    console.log("syncing language");
    const syncLanguage = () => {
      const googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        const selectedLanguage = googleTranslateCombo.value;
        setCurrentLang(selectedLanguage);
      }
    };

    // Check if the translate dropdown is ready
    const intervalId = setInterval(() => {
      if (document.querySelector(".goog-te-combo")) {
        syncLanguage();
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [googleTranslateReady]);

  return (
    <div className="notranslate flex items-center">
      <IoLanguage size={20} />
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
