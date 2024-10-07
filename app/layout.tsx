import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FNA Events",
  description: "FNA-Events - Events und Tuniere made by Pexy",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body
        className={`antialiased min-h-screen bg-gradient-to-br from-purple-800  to-slate-800 dark:text-slate-50 ${inter.className}`}
      >
        <div
          className={`antialiased min-h-screen bg-gradient-to-br from-purple-900  to-slate-900 dark:text-slate-50`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="max-w-2xl mx-auto py-10">
              <header className="bg-white dark:bg-gray-800 shadow-md p-6 mb-5 rounded-full">
                <div className="flex items-center justify-between">
                  <nav>
                    <Link href={"/about"}>
                      <Image
                        src={"/logo.png"}
                        alt="Logo"
                        width={100}
                        height={100}
                      />
                    </Link>
                  </nav>
                  <nav className="ml-auto text-sm font-medium space-x-6">
                    <Link href="/">
                      <p className="mr-1 inline">Home</p>
                    </Link>
                    <Link href="/discord">
                      <p className="inline">Discord</p>
                    </Link>
                    <Link href="/about">
                      <p className="inline">About</p>
                    </Link>
                  </nav>
                </div>
              </header>
              {children}
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
