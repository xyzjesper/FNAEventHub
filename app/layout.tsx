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
  content="upgrade-insecure-requests" />
      </head>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <nav>
                  <Link href={"/about"}>
                    {" "}
                    <Image
                      src={"/logo.png"}
                      alt="Logo"
                      width={80}
                      height={80}
                    ></Image>
                  </Link>
                </nav>{" "}
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">
                    {" "}
                    <p className="mr-1 inline">Home</p>
                  </Link>
                  <Link href="/discord">
                    {" "}
                    <p className=" inline">Discord</p>
                  </Link>
                  <Link href="/about">
                    {" "}
                    <p className="mr-52 inline">About</p>
                  </Link>
                </nav>
                <ModeToggle />
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
        <div className="items-center text-center">
          <Link href="/imprint">
            <p className="inline text-center text-sm text-gray-500 mt-8">
              Impressum
            </p>
          </Link>{" "}
          -{" "}
          <Link href={"/discord"}>
            {" "}
            <p className="inline text-center text-sm text-gray-500 mt-8">
              Discord
            </p>
          </Link>{" "}
          -{" "}
          <Link href={"/terms"}>
            {" "}
            <p className=" inline text-center text-sm text-gray-500 mt-8">
              Terms of Service
            </p>
          </Link>
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} FNA-Events. Alle Rechte vorbehalten.
        </p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </body>
    </html>
  );
}
