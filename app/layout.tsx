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
          className={`antialiased min-h-screen bg-gradient-to-br from-purple-800  to-slate-800 dark:text-slate-50 ${inter.className}`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="max-w-2xl mx-auto py-10">
              <header className="bg-gray-800 shadow-md p-6 mb-5 rounded-full">
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
                  <nav className="ml-auto text-sm font-medium space-x-6 text-white">
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

        <footer className="bg-gray-800 shadow-md p-4 rounded-full mx-auto my-8 max-w-screen-md">
          <div className="flex flex-col items-center justify-center">
            <nav className="text-sm font-medium space-x-4 text-white mb-2">
              <Link href="/imprint">
                <p className="mr-1 inline">Impressum</p>
              </Link>
              <Link href="/terms">
                <p className="inline">Terms of service</p>
              </Link>
            </nav>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} FNA Events.de. All rights
              reserved.
            </p>
          </div>
        </footer>
        <br></br>
      </body>
    </html>
  );
}
