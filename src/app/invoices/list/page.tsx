import TableMyInvoices from "@/components/invoices/TableMyInvoices";
import { Stack, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Stack>
      <Typography
        variant="h5"
        className="mb-6"
        sx={{ color: "#1c2434" }}
      >
        My Invoices
      </Typography>

      <TableMyInvoices />
    </Stack>
  );
};

export default Pages;
