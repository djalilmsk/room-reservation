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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils";
import { DataTable } from "@/components/ui/data-table";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";

const ManagmentMenu = ({
  userId,
  currentRole,
  onRoleChange,
  onDelete,
  isPending,
}) => {
  const [position, setPosition] = useState(
    currentRole?.toLowerCase() || "client",
  );

  const handleRoleChangeLocal = (newRole) => {
    setPosition(newRole);
    onRoleChange(userId, newRole);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="hover:bg-secondary hover:text-primary dark:hover:bg-secondary/50 flex h-8 cursor-pointer items-center justify-center rounded-lg px-2"
          disabled={isPending}
        >
          <Ellipsis className="h-5 w-5" />
        </button>
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
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await customFetch.get("/user");
      return res.data.data;
    },
  });

  const { mutate: updateRole, isPending: isRoleUpdating } = useMutation({
    mutationFn: async ({ userId, data }) => {
      const res = await customFetch.patch(`/user/${userId}/role`, data);
      return res.data;
    },
    onMutate: async ({ userId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) =>
        old.map((user) =>
          user.id === userId ? { ...user, role_name: data.role } : user,
        ),
      );

      return { previousUsers };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully!", {
        style: defaults,
      });
    },
    onError: (context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
      toast.error("Failed to update user role!", {
        style: defaults,
      });
    },
  });

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async (userId) => {
      const res = await customFetch.delete(`/user/${userId}`);
      return res.data;
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old) =>
        old.filter((user) => user.id !== userId),
      );
      return { previousUsers };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!", {
        style: defaults,
      });
    },
    onError: (context) => {
      queryClient.setQueryData(["users"], context.previousUsers);
      toast.error("Failed to delete user!", {
        style: defaults,
      });
    },
  });

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name") || "N/A"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email") || "N/A"}</div>,
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
        const role = row.getValue("role_name")?.toLowerCase() || "client";
        const roleStyles = {
          client: "bg-muted-foreground/40 text-mutate-foreground",
          admin: "bg-secondary text-primary",
          "room manager": "bg-[#fbbc05]/20 text-[#fbbc05]",
          "booking manager": "bg-[#fbbc05]/20 text-[#fbbc05]",
        };
        return (
          <div
            className={cn(
              "w-fit rounded-md px-4 py-1 text-center",
              roleStyles[role] || "bg-gray-200 text-gray-600",
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
          isPending={isRoleUpdating || isDeleting}
        />
      ),
    },
  ];

  const handleRoleChange = (userId, newRole) => {
    updateRole({ userId, data: { role: newRole } });
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="@container mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Users List</h1>
      <DataTable columns={columns} data={users || []} />
    </div>
  );
}

export default UsersList;
