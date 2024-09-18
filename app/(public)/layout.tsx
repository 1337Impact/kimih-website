import ScrollToTop from "@/components/back-to-top";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Kimih",
//   description: "First beauty & wellness platform in UAE",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={rubik.className}>
      <Toaster />
      <Navbar />
      {children}
      <ScrollToTop />
      <Footer />
    </div>
  );
}
