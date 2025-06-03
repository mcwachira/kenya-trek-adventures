"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";
import { ThemeProvider } from "@/components/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="kenya-trek-theme">
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeProvider>
  );
}
