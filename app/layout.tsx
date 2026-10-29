import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "LeafLens | AI Plant Disease Detection",
  description:
    "LeafLens is an AI-powered plant disease detection and smart crop health assistant.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">

      <body>

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>

    </html>

  );

}