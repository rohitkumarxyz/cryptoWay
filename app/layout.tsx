import type { Metadata } from "next";
import "./globals.css";
// @ts-ignore
import { Navbar } from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "CryptoWay",
  description: "A Crypto wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
