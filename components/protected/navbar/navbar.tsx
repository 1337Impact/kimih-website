"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import UserDropdownMenu from "../user-dropdown/user-dropdown";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/languageSlice";
import { getStoredLanguage, loadGoogleTranslate } from "@/lib/load-google-translate";

const getUserData = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  return data;
};

export default function Navbar() {
  const { userData, setUserData } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const language = getStoredLanguage();
    if (language) {
      dispatch(setLanguage(language));
    }
    if (language && language !== "en") {
      loadGoogleTranslate();
    }
  }, [dispatch]);

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
    });
  }, [setUserData]);

  return (
    <header className="fixed bg-white z-[10] w-screen h-[80px] mx-auto text-slate-800 shadow-lg">
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <div className="w-full h-full flex items-center justify-between px-4 sm:px-8 max-w-[1000px] mx-auto">
        <Link
          className="flex items-center gap-2 text-2xl font-bold text-gray-700"
          href="/"
        >
          <Image width={50} height={50} src={"/logo.svg"} alt="Logo" priority />
          <span className="max-sm:hidden notranslate">Kimih</span>
        </Link>
        <UserDropdownMenu userData={userData!} />
      </div>
    </header>
  );
}
