"use client";

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData, Person } from "@/utils/mockData";
import TablePaginationActions from "../table/TablePagination";

const TableMyInvoices = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "invoice",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "amount",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "actions",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(100000));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-[#F7F9FC] border-none"
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      className="font-semibold capitalize"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderTop: "1px solid #EEEEEE",
                },
              }}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-none">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
          component="div"
          count={data.length > 0 ? table.getFilteredRowModel().rows.length : 0}
          rowsPerPage={pageSize}
          page={pageIndex}
          slotProps={{
            select: {
              inputProps: { "aria-label": "rows per page" },
              native: true,
            },
          }}
          onPageChange={(_, page) => table.setPageIndex(page)}
          onRowsPerPageChange={(e) =>
            table.setPageSize(Number(e.target.value) || 10)
          }
          ActionsComponent={TablePaginationActions}
        />
      </CardContent>
    </Card>
  );
};

export default TableMyInvoices;
