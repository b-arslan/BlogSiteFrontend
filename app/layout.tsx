import type { Metadata } from "next";
import "./styles/globals.scss";
import { Inter } from "next/font/google";
//import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psikolog Mehmet Aker",
  description: "Psikolog Mehmet Aker's Blog Website. Learn anything about psychology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
