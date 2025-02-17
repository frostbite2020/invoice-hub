import {
  Box,
  Paper,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
} from "@mui/material";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

export interface ITableHeadProps<T extends Record<string, unknown>> {
  headerGroups: HeaderGroup<T>[];
}

export default function TableHead<T extends Record<keyof T, unknown>>({
  headerGroups,
}: ITableHeadProps<T>) {
  return (
    <MuiTableHead
      sx={{
        bgcolor: "#ffd500",
      }}
    >
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            return (
              <TableCell
                key={header.id}
                align="left"
                className={
                  header.column.columnDef.meta?.headerCellProps?.className
                }
                style={header.column.columnDef.meta?.headerCellProps?.style}
                sx={{
                  borderBottom: `1px solid`,
                  zIndex: 0,
                  borderBottomColor: "transparent",
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  px: 0,
                  "&: last-child": {
                    pr: 0,
                  },
                  ...header.column.columnDef.meta?.headerCellProps?.sx,
                }}
              >
                <Box
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: header.column.getCanSort() ? "pointer" : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Box>
                {header.column.getCanFilter() ? (
                  <Paper
                    sx={{
                      boxShadow: "0 1px 3px #0000001a",
                      mb: 0.5,
                      ml: 0.1,
                    }}
                  >
                    {header.column.columnDef.meta?.filterComponent ? (
                      <header.column.columnDef.meta.filterComponent
                        column={header.column}
                      />
                    ) : null}
                  </Paper>
                ) : null}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </MuiTableHead>
  );
}
