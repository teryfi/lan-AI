import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/AuthProvider";
import { BackgroundMotion } from "@/components/BackgroundMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { AuthModal } from "@/components/AuthModal";

export const metadata = {
  title: "Лань AI",
  description: "Платформа для дизайнеров одежды и AI-подбора гардеробных капсул."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          <BackgroundMotion />
          <div className="app-shell">
            <SiteHeader />
            <main className="page-shell">{children}</main>
            <AuthModal />
          </div>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
