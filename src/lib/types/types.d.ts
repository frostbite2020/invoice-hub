import {
  CellContext,
  Column,
  ColumnDef,
  HeaderContext,
  Row,
  RowData,
  Table,
} from "@tanstack/react-table";
import {
  InputLabelProps as MuiInputLabelProps,
  TableCellProps,
} from "@mui/material";
import React from "react";

export type FilterComponentProps<TData extends RowData> = {
  table: Table<unknown>;
  column: Column<TData>;
  label?: string;
  InputLabelProps?: MuiInputLabelProps;
};

export type ComponentProps<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<unknown>
  ? React.ComponentProps<T>
  : Record<string, unknown>;

export type Field<T> = {
  component: T;
} & ComponentProps<T>;

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    isLoading?: boolean;
    emptyState?: { label?: string };
    onRowClick?: (row: Row<TData>) => void;
  }

  type MetaCellProps<TProps> =
    | ((props: TProps) => TableCellProps)
    | TableCellProps;

  interface ColumnMeta<TData extends RowData, TValue> {
    cellProps?: MetaCellProps<CellContext<TData, TValue>>;
    headerCellProps?: MetaCellProps<HeaderContext<TData, TValue>>;
  }
}

export type ResponseWithMeta<T> = T & {
  meta?: CommonMeta;
};

export type TablePagination = {
  pageSize?: number;
  pageNumber?: number;
};
export type TableSorts<T> = {
  sorts?: ColumnDef<T>["id"] | `-${ColumnDef<T>["id"]}`;
};
export type TableFilter<T> = { [id in keyof T]?: T[id] };

export type TableParams<T> = TablePagination & TableFilter<T> & TableSorts<T>;
