import "./globals.css";
import Footer from "./ui/footer/pages";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
