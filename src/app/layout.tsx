"use client";

import { Box, CssBaseline, Stack, StyledEngineProvider } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/Topbar";
import ThemeProviderWrapper from "@/components/theme/themeProvider";
import { Open_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { useState } from "react";
import { SnackbarProvider } from "notistack";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={openSans.variable}>
      <body className={`antialiased`}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <ThemeProviderWrapper>
              <Box sx={{ display: "flex", height: "100vh" }}>
                <Sidebar />

                <Stack
                  component="main"
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    bgcolor: "var(--background)",
                  }}
                >
                  <TopBar />
                  <Box
                    sx={{
                      width: "80%",
                      height: "100vh",
                      margin: "auto",
                      padding: "52px 3px 3px 3px",
                    }}
                  >
                    {children}
                  </Box>
                </Stack>
              </Box>
            </ThemeProviderWrapper>
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
