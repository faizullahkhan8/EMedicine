import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "next-themes";
import Footer from "./components/Footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico.png"
                    type="image/x-icon"
                />
            </head>
            <body
                suppressHydrationWarning
                suppressContentEditableWarning
                className={`antialiased !bg-[#868db44c] bg-no-repeat dark:bg-gradient-to-b dark:bg-[#121212] duration-300 flex flex-col min-h-screen font-Poppins transition-colors`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Navbar />
                    <div className="flex-1 w-full h-full">{children}</div>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
