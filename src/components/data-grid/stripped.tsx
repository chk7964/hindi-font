"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnVisibility } from "../ui/data-grid-column-visibility";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  parseAsString,
  parseAsInteger,
  useQueryStates,
  parseAsIndex,
} from "nuqs";
import { useTopLoader } from "nextjs-toploader";
import { columns } from "./column";
import { demoData } from "./data";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";

export interface IData {
  id: string;
  name: string;
  availability: "online" | "away" | "busy" | "offline";
  avatar: string;
  status: "active" | "inactive";
  flag: string; // Emoji flags
  email: string;
  company: string;
  role: string;
  joined: string;
  location: string;
  balance: number;
}

export default function DataGridDemo() {
  const isFirstRender = useRef(true);
  const { start, done } = useTopLoader();

  // Use nuqs for URL query parameters with string parsers
  const [isPending, startTransition] = useTransition();

  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsIndex.withDefault(0), // page index matlab = page number
      pageSize: parseAsInteger.withDefault(10), // page size matlab = limit
    },
    {
      shallow: false,
      history: "push",
      throttleMs: 1000,
      startTransition,
      urlKeys: {
        pageIndex: "page",
        pageSize: "pageSize",
      },
    }
  );
  const [, setSort] = useQueryStates(
    {
      sortBy: parseAsString.withDefault("name"),
      sortOrder: parseAsString.withDefault(""),
    },
    {
      shallow: false,
      history: "push",
      throttleMs: 1000,
      startTransition,
    }
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // console.log(Object.keys(rowSelection));

  // Update URL when sorting changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      setSort({ sortBy: id, sortOrder: desc ? "desc" : "asc" });
    } else {
      setSort({ sortBy: null, sortOrder: null });
    }
  }, [sorting]);

  useEffect(() => {
    if (isPending === true) {
      start(); // Start loading when there is a pending transition
    } else if (!isPending) {
      done(); // Mark loading as done when transition is complete
    }
  }, [isPending]);

  const table = useReactTable({
    columns: columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: "onChange",
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <DataGrid
      table={table}
      recordCount={demoData?.length || 0}
      tableLayout={{
        columnsResizable: true,
        headerSticky: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <div className="my-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={{
              pathname: `posts/add-post`,
            }}
          >
            Add Post
          </Link>
        </Button>
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline" size="sm">
              <Settings2 />
              Columns
            </Button>
          }
        />
      </div>
      <div className="w-full space-y-2.5">
        <div className="overflow-x-auto rounded-md border">
          <DataGridContainer>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-muted-foreground text-center text-sm sm:text-left">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <DataGridPagination className="justify-end gap-20" />
        </div>
      </div>
    </DataGrid>
  );
}
