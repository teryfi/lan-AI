"use client";

import { useEffect, useRef, useState } from "react";

export function FancySelect({ label, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="fancy-select" ref={ref}>
      {label ? <strong>{label}</strong> : null}
      <button
        type="button"
        className={`fancy-select-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{selected?.label || placeholder}</span>
        <span className="fancy-select-arrow">⌄</span>
      </button>

      <div className={`fancy-select-menu ${open ? "open" : ""}`}>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={`fancy-select-option ${option.value === value ? "active" : ""}`}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
