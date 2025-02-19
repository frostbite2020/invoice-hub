import InvoiceForm from "@/components/invoices/AddCard";
import { Stack, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Stack>
      <Typography
        className="mb-6 font-bold text-[26px]"
        sx={{ color: "#1c2434" }}
      >
        Add Invoice
      </Typography>

      <InvoiceForm />
    </Stack>
  );
};

export default Pages;
