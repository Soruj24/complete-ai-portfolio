"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectNames: string[];
  loading?: boolean;
}

export function ProjectDeleteDialog({ open, onClose, onConfirm, projectNames, loading }: Props) {
  const count = projectNames.length;
  const isBulk = count > 1;

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[15px]">
            {isBulk ? `Delete ${count} projects?` : `Delete "${projectNames[0]}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px]">
            {isBulk
              ? `These ${count} projects will be permanently deleted. This action cannot be undone.`
              : "This project will be permanently deleted. This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className="h-8 text-[13px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="h-8 text-[13px] bg-red-500 text-white hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
