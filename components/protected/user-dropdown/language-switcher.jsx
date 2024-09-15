import { RootState } from "@/store";
import { setLanguage } from "@/store/languageSlice";
import { useCallback } from "react";
import { IoLanguage } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const LanguageSwitcher = () => {
  const language = useSelector((state) => state.languageSlice.language);
  const dispatch = useDispatch();

  const handleLanguageChange = useCallback(() => {
    console.log("Language: ", language);
    const languageCode = language === "en" ? "ar" : "en";
    const googleTranslateCombo = document.querySelector(".goog-te-combo");
    if (googleTranslateCombo) {
      console.log("Language Code: ", languageCode);
      googleTranslateCombo.value = languageCode;
      dispatch(setLanguage(languageCode));
      googleTranslateCombo.dispatchEvent(new Event("change"));
      localStorage.setItem("language", languageCode);
    }
  }, [dispatch, language]);

  return (
    <div className="flex items-center cursor-pointer">
      <IoLanguage size={20} />
      <span className="mr-2" onClick={handleLanguageChange}>
        {language === "en" ? "Arabic" : "English"}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
