// src/components/ui/avatar.jsx
import React from "react";

export function Avatar({ className = "", letter = "U" }) {
  return (
    <div
      className={`rounded-full bg-gray-600 text-white flex items-center justify-center font-bold ${className}`}
    >
      {letter.toUpperCase()}
    </div>
  );
}
