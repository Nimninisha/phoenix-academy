import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Phoenix Academy",
  description: "Education for every curriculum, every age, every learner."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="site-body">

        {/* GLOBAL NAVIGATION BAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="site-main">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />

      </body>
    </html>
  );
}
