import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KIMIH",
    template: "%s",
  },
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
      <head className="notranslate">
        <script src="https://tap-sdks.b-cdn.net/card/1.0.2/index.js" async />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
