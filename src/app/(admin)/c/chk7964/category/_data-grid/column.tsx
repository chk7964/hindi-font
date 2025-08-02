import { type ColumnDef, type Row } from "@tanstack/react-table";
import { type IData } from "./stripped";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { env } from "@/config/env";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<IData>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: () => <DataGridTableRowSelectAll />,
    cell: ({ row }) => <DataGridTableRowSelect row={row} />,
    enableSorting: false,
    size: 35,
    meta: {
      headerClassName: "",
      cellClassName: "",
    },
    enableResizing: false,
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataGridColumnHeader title="Name" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 200,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataGridColumnHeader title="Slug" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 150,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "fileCount",
    header: ({ column }) => (
      <DataGridColumnHeader title="fileCount" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 150,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "postCount",
    header: ({ column }) => (
      <DataGridColumnHeader title="postCount" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 150,
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row} />,
    size: 60,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
];

function ActionsCell({ row }: { row: Row<IData> }) {
  const router = useRouter();
  const handleDelete = async (id: string[]) => {
    const url = new URL(
      `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/category/delete-category`
    );
    const response = await axios.delete(url.toString(), {
      data: { ids: id },
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={{
              pathname: `category/add-edit-category`,
              query: { id: row.original.id },
            }}
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={() => handleDelete([String(row.original.id)])}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
