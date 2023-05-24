import { Space_Grotesk } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";

const sG = Space_Grotesk({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sG.className}>
      <body className="max-w-7xl mx-auto">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
