import { Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Providers";
import { contructMetaData } from "@/lib/utils";
const recursive = Recursive({ subsets: ["latin"] });
export const metadata = contructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${recursive.className} h-full flex flex-col`}>
          <Navbar />
          <main className="flex flex-col flex-1 grainy-light">
            <div className="flex-1">
              <Provider>{children}</Provider>
            </div>
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
    // <html lang="en">
    //   <body className={inter.className}>
    //     <Navbar />
    //     <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
    //       <div className="flex-1 flex flex-col h-full">{children}</div>
    //       <Footer />
    //     </main>
    //   </body>
    // </html>
  );
}
