import { Suspense } from "react";
import { MessagesExperience } from "@/components/MessagesExperience";

export default function Page() {
  return (
    <Suspense fallback={<div className="page-grid messages-page-grid"><div className="empty-block">Загружаем сообщения...</div></div>}>
      <div className="page-grid messages-page-grid">
        <MessagesExperience mode="workspace" />
      </div>
    </Suspense>
  );
}
