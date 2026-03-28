"use client";

import { useApp } from "@/components/AuthProvider";

export function FlashToast() {
  const { flashMessage } = useApp();

  if (!flashMessage) return null;

  return (
    <div className="flash-toast flash-toast-success" role="status" aria-live="polite">
      <span className="flash-toast-dot" aria-hidden="true" />
      <span>{flashMessage}</span>
    </div>
  );
}
