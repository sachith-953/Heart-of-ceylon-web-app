import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heart Of Ceylon",
  description: "this is the home page of Heart Of Ceylon. bla bla.. add something for SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* this cn() help us to add multiple class names and render then conditionally */}
      <body className={cn("relative h-full font-sans antialiased", inter.className)}>
        <main className="relative flex flex-col min-h-screen">
        {/* <Navbar /> */}
          <div className="flex-grow flex-1">{children}</div>
          
        </main>

        {/* https://ui.shadcn.com/docs/components/toast */}
        <Toaster /> 
        
      </body>
    </html>
  );
}