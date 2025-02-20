import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack className="justify-center items-center">
      <Typography className="text-[#1c2434] font-semibold text-lg">
        Please go to invoices page, press the button below
      </Typography>
      <Link href="/invoices/add" passHref>
        <Button
          variant="contained"
          color="primary"
          className="mt-6 !bg-blue-600 !text-white"
        >
          Invoices
        </Button>
      </Link>
    </Stack>
  );
}
