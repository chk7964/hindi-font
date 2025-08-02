import { type ColumnDef, type Row } from "@tanstack/react-table";
import { type IData } from "./stripped";
import { DataGridColumnHeader } from "../ui/data-grid-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "../ui/data-grid-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

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
      <DataGridColumnHeader title="Staff" column={column} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={`/media/avatars/${row.original.avatar}`}
              alt={row.original.name}
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="space-y-px">
            <div className="text-foreground font-medium">
              {row.original.name}
            </div>
            <div className="text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      );
    },
    size: 200,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataGridColumnHeader title="Company" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 150,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataGridColumnHeader title="Occupation" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 125,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataGridColumnHeader title="Dividend" column={column} />
    ),
    cell: (info) => <span>${(info.getValue() as number).toFixed(2)}</span>,
    size: 120,
    meta: {
      headerClassName: "",
      cellClassName: "font-semibold",
    },
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
