"use client";

import { useRouter } from "next/navigation";
import { getEntityHref } from "@/lib/entity-navigation";

function isInteractiveTarget(target) {
  return Boolean(target.closest("a, button, input, select, textarea, label"));
}

export function EntityCardLink({
  as: Component = "article",
  className,
  entity,
  entityType,
  ariaLabel,
  children,
  ...props
}) {
  const router = useRouter();
  const href = getEntityHref(entityType, entity);

  const openEntity = () => {
    router.push(href);
  };

  return (
    <Component
      className={`${className || ""} entity-card-link`}
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      {...props}
      onClick={(event) => {
        if (isInteractiveTarget(event.target)) return;
        openEntity();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openEntity();
      }}
    >
      {children}
    </Component>
  );
}
