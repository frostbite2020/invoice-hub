import { Card, CardContent, Typography } from "@mui/material";

const TableList = () => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "var(--secondary)" }}
        >
          My Invoices
        </Typography>
      </CardContent>

      <CardContent></CardContent>
    </Card>
  );
};

export default TableList;
