import TableList from "@/components/invoices/TableList";
import { Stack, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Stack>
      <Typography
        variant="h5"
        className="mb-6"
        sx={{ color: "var(--secondary)" }}
      >
        My Invoices
      </Typography>

      <TableList />
    </Stack>
  );
};

export default Pages;
