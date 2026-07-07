import Swal from "sweetalert2";

const base = {
  background: "var(--surface-primary)",
  color: "var(--text-primary)",
  confirmButtonColor: "var(--accent)",
  cancelButtonColor: "#6b7280",
};

export function confirmDelete(title: string, text: string) {
  return Swal.fire({
    ...base,
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });
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
