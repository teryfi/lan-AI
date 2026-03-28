import { Suspense } from "react";
import { StyleAssistantPage } from "@/components/StyleAssistantPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="page-grid"><div className="empty-block">Загружаем помощника...</div></div>}>
      <StyleAssistantPage />
    </Suspense>
  );
}
