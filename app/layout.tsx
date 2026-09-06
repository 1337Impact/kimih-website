import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KIMIH",
    template: "%s",
  },
  description: "First beauty & wellness platform in UAE",
  openGraph: {
    title: "KIMIH",
    description: "First beauty & wellness platform in UAE",
    url: "https://kimih.com",
    siteName: "Kimih",
    type: "website",
    images: "https://kimih.com/assets/images/yoga.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head className="notranslate" />
      <body suppressHydrationWarning={true} className={rubik.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
