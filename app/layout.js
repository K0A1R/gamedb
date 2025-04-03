import "./globals.css";

import { AuthContextProvider } from "./_utils/auth-context";

export const metadata = {
  title: "GameDB",
  description: "Generated by Amrit Reddy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-800">
        <AuthContextProvider>
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
