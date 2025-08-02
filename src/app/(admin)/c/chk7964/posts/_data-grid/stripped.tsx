"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";

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
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { env } from "@/config/env";
import { toast } from "sonner";
import { type apiResponse } from "@/types/api-response";
import { useRouter } from "next/navigation";

export interface IData {
  id: number;
  title: string;
  content: string;
  status: boolean;
  slug: string;
  created_at: Date;
  updated_at: Date;
  category_id: number;
}

export default function DataGridDemo({ data }: { data: any }) {
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

  console.log(Object.keys(rowSelection));

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
    data,
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.id),
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
      recordCount={data?.length || 0}
      tableLayout={{
        columnsResizable: true,
        headerSticky: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <div className="my-2 flex justify-end gap-2">
        <Delete rowSelection={rowSelection} />
        <Button variant="outline" size="sm" asChild>
          <Link
            href={{
              pathname: `posts/add-edit-post`,
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

function Delete({ rowSelection }: { rowSelection: any }) {
  const router = useRouter();

  const handleDelete = async () => {
    const url = new URL(
      `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/posts/delete-post`
    );
    const response: apiResponse = await axios.delete(url.toString(), {
      data: { ids: Object.keys(rowSelection) as string[] },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response;

    if (data.success) {
      toast.success(data.message);
      router.refresh();
    }
  };

  return (
    <>
      {Object.keys(rowSelection).length > 0 ? (
        <Button size="sm" onClick={handleDelete}>
          Delete
        </Button>
      ) : (
        <Button size="sm" disabled>
          Delete
        </Button>
      )}
    </>
  );
}
