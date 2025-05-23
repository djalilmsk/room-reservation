"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function DataTable({ columns, data = [], to = "", classNames = {} }) {
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="bg-secondary hover:bg-secondary border-0"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                className="px-4 py-4 first:rounded-l-lg last:rounded-r-lg"
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn("hover:bg-background", to && "cursor-pointer")}
              onClick={() => {
                if (to) navigate(`${to}/${table.getRow(index).original.id}`);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className={cn("px-4 py-3 font-light", classNames?.bodyCell)}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-background">
            <TableCell colSpan={columns?.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
