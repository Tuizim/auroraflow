"use client";
import { useState } from "react";

export function useTodoCard() {
  const [status, setStatus] = useState(true);

  const toggleStatus = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => !prev)
  };

  return { status, toggleStatus };
}