import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/components/authProvider/AuthProvider";
import Toast from "@/components/toast/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '700', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Fülesbagoly Vendégház Orfű",
  description: "Kikapcsolódás a természet lágy ölén",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
          <Toast/>
            <main className="font-normal">
              <Header/>
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}