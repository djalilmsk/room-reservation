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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const data = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Smith",
    email: "john.smith@email.com",
    phoneNumber: "123-456-7890",
    password: "$2a$10$XDKj0E2M1Y7u9pQ8rR3v0u",
    created_at: new Date(),
    image: "https://example.com/images/john.jpg",
    emailNotification: true,
    resetCode: null,
    resetCodeExpiresAt: null,
    updated_at: new Date(),
    role: "Client",
    referral_source: "Friend",
    profession: "Software Engineer",
    passwordChangedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phoneNumber: null,
    password: "$2a$10$Y9u8pQ7rR3v0uXDKj0E2M1",
    created_at: new Date(),
    image: null,
    emailNotification: false,
    resetCode: "ABCD1234",
    resetCodeExpiresAt: new Date(),
    updated_at: new Date(),
    role: "Admin",
    referral_source: "Website",
    profession: "Project Manager",
    passwordChangedAt: new Date(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Mike Brown",
    email: "mike.brown@email.com",
    phoneNumber: "987-654-3210",
    password: "$2a$10$R3v0uXDKj0E2M1Y7u9pQ8r",
    created_at: new Date(),
    image: "https://example.com/images/mike.jpg",
    emailNotification: true,
    resetCode: null,
    resetCodeExpiresAt: null,
    updated_at: new Date(),
    role: "Booking Manager",
    referral_source: "Social Media",
    profession: "Hotel Manager",
    passwordChangedAt: null,
  },
];

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader className="overflow-hidden rounded-lg">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="bg-secondary hover:bg-secondary border-0"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <TableHead className="px-4 py-4" key={header.id}>
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
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="hover:bg-background"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="px-4 py-3 font-light" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const ManagmentMenu = ({ userId, currentRole, onRoleChange, onDelete }) => {
  const [position, setPosition] = useState(currentRole);

  const handleRoleChangeLocal = (newRole) => {
    setPosition(newRole);
    onRoleChange(userId, newRole);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleRoleChangeLocal}
        >
          <DropdownMenuRadioItem value="Client">Client</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Room Manager">
            Room Manager
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Booking Manager">
            Booking Manager
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Admin">Admin</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuItem
          onClick={() => onDelete(userId)}
          className="text-destructive focus:bg-destructive/30 focus:text-destructive text-center"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function UsersList() {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <div>{row.getValue("phoneNumber") || "N/A"}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div
          className={cn(
            "w-fit rounded-md px-4 py-1 text-center",
            {
              client: "bg-muted-foreground/40",
              admin: "bg-secondary text-primary",
            }[row.getValue("role").toLowerCase()] ||
              "bg-[#fbbc05]/20 text-[#fbbc05]",
          )}
        >
          {row.getValue("role")}
        </div>
      ),
    },
    {
      accessorKey: "edit",
      header: "",
      cell: ({ row }) => (
        <ManagmentMenu
          userId={row.original.id}
          currentRole={row.original.role}
          onRoleChange={handleRoleChange}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const handleRoleChange = (userId, newRole) => {
    console.log(`Role changed for user ${userId} to ${newRole}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <div className="@container mx-auto space-y-8 overflow-scroll py-10">
      <h1 className="text-2xl font-bold">Users List</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default UsersList;
