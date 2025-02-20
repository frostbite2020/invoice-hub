import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <Typography variant="h3" className="text-gray-800 font-bold">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" className="text-gray-600 mt-2 text-center">
        Sorry, the page you&apos;re looking for does not exist.
      </Typography>

      <Link href="/invoices/add" passHref>
        <Button
          variant="contained"
          color="primary"
          className="mt-6 !bg-blue-600 !text-white"
        >
          Go Home
        </Button>
      </Link>
    </Container>
  );
}
