import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


const RootLayout = ({ children }) => (
  <ClerkProvider>

  <html lang="en">
  <body>
    <AntdRegistry>{children}</AntdRegistry>
  </body>
</html>
</ClerkProvider>

);

export default RootLayout;