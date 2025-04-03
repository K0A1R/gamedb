import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function GameDbLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
