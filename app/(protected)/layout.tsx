"use client";
import Navbar from "@/components/protected/navbar/navbar";
import { UserProvider } from "../context/UserContext";
import { Toaster } from "@/components/ui/toaster";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserProvider>
        <Toaster />
        <Navbar />
        <main className="pt-32 pb-10 max-w-[1000px] px-4 md:px-6 mx-auto">
          {children}
        </main>
      </UserProvider>
    </div>
  );
}
