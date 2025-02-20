"use client";

import { useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <Typography variant="h3" className="text-gray-800 font-bold">
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" className="text-gray-600 mt-2 text-center">
        {error.message || "An unexpected error occurred."}
      </Typography>

      <Box className="mt-6 flex gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
          className="!bg-blue-600 !text-white"
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/invoices/add")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
