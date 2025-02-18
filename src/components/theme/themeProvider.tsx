"use client";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/theme/theme";
import { ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({
  children,
}: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
