"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  experienceName: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function ExperienceDeleteDialog({ open, experienceName, onConfirm, onCancel }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
      onCancel();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 mx-auto sm:mx-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <DialogTitle className="mt-2">Delete Experience</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-medium text-text-primary">{experienceName}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={deleting} className="h-8 text-[13px]">Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={deleting} className="h-8 text-[13px]">
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
