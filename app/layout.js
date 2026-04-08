import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/AuthProvider";
import { BackgroundMotion } from "@/components/BackgroundMotion";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Лань AI",
  description: "Платформа для дизайнеров одежды и AI-подбора гардеробных капсул."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f0e8"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="app-body">
        <AuthProvider>
          <BackgroundMotion />
          <div className="app-shell">
            <SiteHeader />
            <main className="page-shell">{children}</main>
          </div>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
