import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

import { AuthContextProvider } from "./_utils/auth-context";

export const metadata = {
  title: "GameDB",
  description: "Generated by Amrit Reddy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-800 flex flex-col text-white">
        <AuthContextProvider>
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
