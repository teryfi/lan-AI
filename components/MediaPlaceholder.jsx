"use client";

import { memo } from "react";

export const MediaPlaceholder = memo(function MediaPlaceholder({
  className = "",
  ariaLabel = "Media placeholder"
}) {
  return (
    <div
      aria-label={ariaLabel}
      className={`media-placeholder ${className}`.trim()}
      role="img"
    />
  );
});
