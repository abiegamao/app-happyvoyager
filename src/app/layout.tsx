import type { Metadata } from "next";
import { Allura } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Happy Voyager",
  description: "Happy Voyager — Customer Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${allura.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
