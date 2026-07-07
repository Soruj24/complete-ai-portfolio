import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, ShieldAlert, Ban, Trash2 } from "lucide-react";

interface Props {
  role: string;
  status: string;
  onEdit: () => void;
  onChangeRole: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export function UserActions({ role, status, onEdit, onChangeRole, onToggleStatus, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-7 w-7 p-0 rounded-md hover:bg-surface-hover">
          <MoreHorizontal className="h-4 w-4 text-text-tertiary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 p-1">
        <DropdownMenuItem onClick={onEdit} className="rounded-md gap-2 py-2 text-xs">
          <Settings className="h-3.5 w-3.5" /> Edit Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onChangeRole} className="rounded-md gap-2 py-2 text-xs">
          <ShieldAlert className="h-3.5 w-3.5" /> {role === "admin" ? "Make User" : "Make Admin"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleStatus} className="rounded-md gap-2 py-2 text-xs text-error">
          <Ban className="h-3.5 w-3.5" /> {status === "active" ? "Ban User" : "Unban User"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="rounded-md gap-2 py-2 text-xs text-error">
          <Trash2 className="h-3.5 w-3.5" /> Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
