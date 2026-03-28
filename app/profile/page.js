import { Suspense } from "react";
import { ProfilePage } from "@/components/ProfilePage";

export default function Page() {
  return (
    <Suspense fallback={<div className="page-grid"><div className="empty-block">Загружаем профиль...</div></div>}>
      <ProfilePage />
    </Suspense>
  );
}
