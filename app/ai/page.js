import { Suspense } from "react";
import { AIPage } from "@/components/AIPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="page-grid"><div className="empty-block">Загружаем AI...</div></div>}>
      <AIPage />
    </Suspense>
  );
}
