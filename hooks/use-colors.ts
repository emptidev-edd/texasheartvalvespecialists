"use client";

import { useMemo } from "react";
import { colorVars, colors, type ColorName, type ColorPalette } from "@/lib/colors";

function readPalette(): ColorPalette {
  if (typeof window === "undefined") return colors;

  const styles = getComputedStyle(document.documentElement);
  const next: ColorPalette = { ...colors };

  (Object.keys(colorVars) as ColorName[]).forEach((name) => {
    const value = styles.getPropertyValue(colorVars[name]).trim();
    if (value) next[name] = value;
  });

  return next;
}

export function useColors() {
  return useMemo(() => readPalette(), []);
}

export function useColor(name: ColorName) {
  return useColors()[name];
}
