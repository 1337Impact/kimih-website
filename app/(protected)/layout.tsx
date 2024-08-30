"use client";
import Navbar from "@/components/protected/navbar/navbar";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <UserProvider>
        <Navbar />
        <main className="pt-32 max-w-[1000px] px-4 md:px-6 mx-auto">
        {children}
        </main>
      </UserProvider>
    </div>
  );
}
