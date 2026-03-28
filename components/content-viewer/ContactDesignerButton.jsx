"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getDesignerContactHref } from "@/lib/entity-navigation";

export function ContactDesignerButton({
  designer,
  contextType,
  contextId,
  contextTitle,
  label = "Связаться с дизайнером",
  className = "primary-btn"
}) {
  const href = getDesignerContactHref({
    designer,
    contextType,
    contextId,
    contextTitle
  });

  return (
    <Link className={className} href={href}>
      <MessageCircle size={16} />
      {label}
    </Link>
  );
}
