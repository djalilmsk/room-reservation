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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { DataTable } from "@/components/ui/data-table";

const ManagmentMenu = ({ userId, currentRole, onRoleChange, onDelete }) => {
  const [position, setPosition] = useState(currentRole?.toLowerCase());

  const handleRoleChangeLocal = (newRole) => {
    setPosition(newRole);
    onRoleChange(userId, newRole);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className="hover:bg-secondary hover:text-primary dark:hover:bg-secondary/50 flex h-8 cursor-pointer items-center justify-center rounded-lg px-2"
          variant="ghost"
          size="icon"
        >
          <Ellipsis className="h-5 w-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleRoleChangeLocal}
        >
          <DropdownMenuRadioItem value="client">Client</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="room manager">
            Room Manager
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="booking manager">
            Booking Manager
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(userId)}
          className="text-destructive focus:bg-destructive/30 focus:text-destructive cursor-pointer text-center"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function UsersList() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await customFetch.get("/user");
      return res.data.data;
    },
  });

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
      accessorKey: "profession",
      header: "Profession",
      cell: ({ row }) => <div>{row.getValue("profession") || "N/A"}</div>,
    },
    {
      accessorKey: "role_name",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role_name")?.toLowerCase();
        return (
          <div
            className={cn(
              "w-fit rounded-md px-4 py-1 text-center",
              {
                client: "bg-muted-foreground/40",
                admin: "bg-secondary text-primary",
              }[role] || "bg-[#fbbc05]/20 text-[#fbbc05]",
            )}
          >
            {role}
          </div>
        );
      },
    },
    {
      accessorKey: "edit",
      header: "",
      cell: ({ row }) => (
        <ManagmentMenu
          userId={row.original.id}
          currentRole={row.original.role_name}
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
    <div className="@container mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Users List</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default UsersList;
