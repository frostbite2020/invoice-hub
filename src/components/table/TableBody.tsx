import React, { CSSProperties } from "react";
import { flexRender, HeaderGroup, Row, TableMeta } from "@tanstack/react-table";
import {
  TableBody as MuiTableBody,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";

export interface ITableBodyProps<T extends Record<string, unknown>> {
  rows: Row<T>[];
  headerGroups: HeaderGroup<T>[];
  pageSize?: number;
  isLoading?: boolean;
  noDataLabel?: string;
  style?: CSSProperties | undefined;
  className?: string | undefined;
  role?: string | undefined;
  tableMeta?: TableMeta<T>;
}

export default function TableBody<T extends Record<keyof T, unknown>>({
  rows,
  headerGroups,
  pageSize = 10,
  isLoading,
  noDataLabel,
  tableMeta,
}: ITableBodyProps<T>) {
  const emptyRows = pageSize - Math.min(pageSize, rows.length);

  const renderLoadingRow = React.useMemo(
    () =>
      [...Array(Math.max(emptyRows, pageSize))].map((_, i) => (
        <TableRow key={i}>
          {[...Array(Number(headerGroups[0].headers.length))].map((__, j) => (
            <TableCell key={j}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      )),
    []
  );

  const renderEmptyRow = React.useMemo(
    () => (
      <TableRow sx={{ bgcolor: "common.white" }}>
        <TableCell
          colSpan={Number(headerGroups[0].headers.length)}
          sx={{
            height: "30px",
            bgcolor: "common.white",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          {rows.length === 0 ? noDataLabel : null}
        </TableCell>
      </TableRow>
    ),
    [rows]
  );

  const renderDataRow = React.useMemo(
    () => (
      <>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            hover
            onClick={() => tableMeta?.onRowClick?.(row) ?? {}}
          >
            {row
              .getVisibleCells()
              .map((cell, j: React.Key | null | undefined) => {
               

                return (
                  <TableCell
                    className={cell.column.columnDef.meta?.cellProps?.className}
                    
                    key={j}
                    style={cell.column.columnDef.meta?.cellProps?.style}
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Poppins-Regular",
                      height: "30px",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.33)",
                      ...cell.column.columnDef.meta?.cellProps?.sx,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
          </TableRow>
        ))}
        {rows.length === 0 ? renderEmptyRow : null}
      </>
    ),
    [rows]
  );

  return (
    <MuiTableBody>{isLoading ? renderLoadingRow : renderDataRow}</MuiTableBody>
  );
}
