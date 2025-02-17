import InvoiceForm from "@/components/invoices/AddCard";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Stack>
      <Typography
        variant="h5"
        className="mb-6"
        sx={{ color: "var(--secondary)" }}
      >
        Add Invoice
      </Typography>

      <InvoiceForm />
    </Stack>
  );
};

export default Pages;
