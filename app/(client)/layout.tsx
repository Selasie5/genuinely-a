import type { Metadata } from "next";
import { Bricolage_Grotesque} from "next/font/google"
import "./globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "../utils/Provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genuinely A",
  description: "Ayerkie's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
        className={`${bricolage.className} h-full bg-amber-50 text-indigo-950 dark:bg-slate-950 dark:text-amber-50 dark:selection:bg-purple-500`}
      >
        <Provider>
        <Navbar/>
        <main className="mx-auto max-w-5xl px-6">
        {children}
        </main>
        </Provider>
       
        
      </body>
    </html>
  );
}
