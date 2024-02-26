import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "./../providers/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevTodo",
  description: "Never forget your TODOs comments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
