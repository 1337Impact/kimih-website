import { setLanguage } from "@/store/languageSlice";
import { useCallback } from "react";
import { Languages } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyGoogleTranslateLanguage,
  loadGoogleTranslate,
} from "@/lib/load-google-translate";

const LanguageSwitcher = () => {
  const language = useSelector((state) => state.languageSlice.language);
  const dispatch = useDispatch();

  const handleLanguageChange = useCallback(async () => {
    const languageCode = language === "en" ? "ar" : "en";
    await loadGoogleTranslate();
    applyGoogleTranslateLanguage(languageCode);
    dispatch(setLanguage(languageCode));
    localStorage.setItem("language", languageCode);
    localStorage.setItem("kimih-lang", languageCode);
  }, [dispatch, language]);

  return (
    <div className="flex items-center cursor-pointer">
      <Languages size={20} />
      <span className="mr-2" onClick={handleLanguageChange}>
        {language === "en" ? "Arabic" : "English"}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
