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
import { formatBytes } from "@/utils/formatBytes";

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
    accessorKey: "filename",
    id: "name",
    header: ({ column }) => (
      <DataGridColumnHeader title="Filename" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 200,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "mimetype",
    header: ({ column }) => (
      <DataGridColumnHeader title="Mimetype" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 150,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataGridColumnHeader title="Size" column={column} />
    ),
    cell: (info) => {
      const raw = info.getValue();
      const bytes = typeof raw === "string" ? parseFloat(raw) : raw;
      return <span>{formatBytes(bytes as number)}</span>;
    },
    size: 125,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "uploaded_at",
    header: ({ column }) => (
      <DataGridColumnHeader title="Uploaded_At" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 120,
    meta: {
      headerClassName: "",
      cellClassName: "font-semibold",
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "download_count",
    header: ({ column }) => (
      <DataGridColumnHeader title="Download_Count" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 120,
    meta: {
      headerClassName: "",
      cellClassName: "font-semibold",
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => (
      <DataGridColumnHeader title="Category_Id" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 120,
    meta: {
      headerClassName: "",
      cellClassName: "font-semibold",
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "post_id",
    header: ({ column }) => (
      <DataGridColumnHeader title="Post_Id" column={column} />
    ),
    cell: (info) => <span>{info.getValue() as string}</span>,
    size: 120,
    meta: {
      headerClassName: "",
      cellClassName: "font-semibold",
    },
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <ActionsCell row={row} />,
  //   size: 60,
  //   enableSorting: false,
  //   enableHiding: false,
  //   enableResizing: false,
  // },
];

// function ActionsCell({ row }: { row: Row<IData> }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button className="size-7" variant="ghost">
//           <Ellipsis />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent side="bottom" align="end">
//         <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
//         <DropdownMenuItem>Copy ID</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
