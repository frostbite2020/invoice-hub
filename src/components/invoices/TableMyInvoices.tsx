"use client";

import { Invoice, useInvoices, useRemoveInvoice } from "@/hooks/useInvoices";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { flexRender } from "@tanstack/react-table";
import StatusBadge from "@/components/statusBadge/StatusBadge";
import { Status } from "@/constants/enum";
import { useSnackbar } from "notistack";

const TableMyInvoices: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const statusFilter = searchParams.get("status") || "";

  const { data: invoices = [], isLoading, isError } = useInvoices();
  const { mutate: removeInvoice } = useRemoveInvoice();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickEdit = () => {
    enqueueSnackbar("Edit coming soon", { variant: "warning" });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClickEdit();
    handleClose();
  };

  const handleDelete = (id: string) => {
    removeInvoice(id);
    handleClose();
  };

  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "invoice",
        cell: (info) => {
          const { invoiceName, invoiceNumber } = info.row.original;
          return (
            <Stack>
              <Typography>{invoiceName}</Typography>
              <Typography className="text-[#64748B] font-semibold text-[14px]">
                {invoiceNumber}
              </Typography>
            </Stack>
          );
        },
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        cell: (info) => {
          const statusValue = info.getValue() as string;
          return (
            <StatusBadge
              status={Status[statusValue.toLowerCase() as keyof typeof Status]}
            />
          );
        },
      },
      {
        accessorKey: "amount",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "actions",
        cell: (info) => {
          const { id } = info.row.original;
          return (
            <>
              <IconButton size="small" onClick={handleClick}>
                <MenuRoundedIcon sx={{ color: "#7E7E7E" }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>
                  <EditRoundedIcon className="mr-2 text-blue-600" /> Edit
                </MenuItem>
                <MenuItem onClick={() => handleDelete(id)}>
                  <DeleteRoundedIcon className="mr-2 text-[#D34053]" /> Delete
                </MenuItem>
              </Menu>
            </>
          );
        },
      },
    ],
    [removeInvoice, handleDelete]
  );

  const filteredData = useMemo(() => {
    return invoices.filter((row) => {
      return (
        (statusFilter === "All" ||
          !statusFilter ||
          row.status === statusFilter) &&
        (row.invoiceName.toLowerCase().includes(searchQuery) ||
          row.invoiceNumber.toLowerCase().includes(searchQuery) ||
          row.dueDate.toLowerCase().includes(searchQuery) ||
          row.amount.includes(searchQuery))
      );
    });
  }, [invoices, statusFilter, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading invoices.</div>;

  return (
    <Card>
      <CardContent
        className="min-h-[450px]"
        sx={{ border: "1px solid #e2e8f0" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#F7F9FC]">
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      className="font-semibold capitalize"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: "All", value: invoices.length },
          ]}
          component="div"
          count={filteredData.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          onRowsPerPageChange={(e) =>
            table.setPageSize(Number(e.target.value) || 10)
          }
        />
      </CardContent>
    </Card>
  );
};

export default TableMyInvoices;
