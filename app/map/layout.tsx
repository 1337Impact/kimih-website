import ScrollToTop from "@/components/back-to-top";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kimih",
  description: "First beauty & wellness platform in UAE",
};

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <Navbar />
      {children}
      <ScrollToTop />
    </>
  );
}
