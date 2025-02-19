import TableMyInvoices from "@/components/invoices/TableMyInvoices";
import SearchFilter from "@/components/search/Search";
import { Stack, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Stack className="pb-10">
      <Stack className="flex-row justify-between">
        <Typography variant="h5" className="mb-6 " sx={{ color: "#1c2434" }}>
          My Invoices
        </Typography>

        <SearchFilter />
      </Stack>

      <TableMyInvoices />
    </Stack>
  );
};

export default Pages;
