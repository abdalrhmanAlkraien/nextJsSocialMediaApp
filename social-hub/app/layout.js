import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import "@/style/typography.css"
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClerkProvider } from "@clerk/nextjs";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const public_Sans = Public_Sans({
  subsets: ["latin"],
  weight: ['400','500', '600']
})

export const metadata = {
  title: "Social hop",
  description: "Social hop application",
};

const viewPort = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: 1.0
}

const RootLayout = ({ children }) => (
  <ClerkProvider
    appearance={{
      signIn: {
        variables: {colorPrimary: "#F9AA11"}
      },
      signUp: {
        variables: {colorPrimary: "#F9AA11"}
      }
    }}
  >

  <html lang="en">
  <body className={public_Sans.className}>
    <AntdRegistry>{children}</AntdRegistry>
  </body>
</html>
</ClerkProvider>

);

export default RootLayout;