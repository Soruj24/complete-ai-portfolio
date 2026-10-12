import Swal from "sweetalert2";

const base = {
  background: "var(--surface-primary)",
  color: "var(--text-primary)",
  confirmButtonColor: "var(--accent)",
  cancelButtonColor: "#6b7280",
};

export interface ConfirmOptions {
  confirmText?: string;
  cancelText?: string;
  /** Renders the confirm button in the destructive red. */
  danger?: boolean;
  icon?: "warning" | "question" | "info" | "error" | "success";
}

/**
 * Generic yes/no confirmation replacing native `window.confirm`.
 * Resolves `true` only when the user actually confirms — never a truthy result object.
 */
export async function confirmDialog(
  title: string,
  text?: string,
  { confirmText = "Confirm", cancelText = "Cancel", danger = false, icon = "warning" }: ConfirmOptions = {}
): Promise<boolean> {
  const result = await Swal.fire({
    ...base,
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: danger ? "#ef4444" : base.confirmButtonColor,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

/** Destructive-action confirmation. Resolves `true` only when confirmed. */
export function confirmDelete(title: string, text?: string) {
  return confirmDialog(title, text, { confirmText: "Yes, delete it", danger: true });
}

export function toastSuccess(title: string, text?: string) {
  return Swal.fire({
    ...base,
    title,
    text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}

export function toastError(title: string, text?: string) {
  return Swal.fire({
    ...base,
    title,
    text,
    icon: "error",
    timer: 3000,
    showConfirmButton: false,
  });
}