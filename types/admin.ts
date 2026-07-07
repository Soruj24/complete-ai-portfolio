import type { LucideIcon } from "lucide-react";

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "textarea"
  | "richtext"
  | "select"
  | "multi-select"
  | "date"
  | "datetime"
  | "toggle"
  | "image"
  | "file"
  | "url"
  | "password"
  | "color"
  | "json"
  | "slug";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  custom?: (value: unknown) => string | null;
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  options?: SelectOption[];
  validation?: FieldValidation;
  defaultValue?: unknown;
  hidden?: boolean;
  disabled?: boolean;
  /** For table display */
  sortable?: boolean;
  filterable?: boolean;
  /** Custom render for table cell */
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  /** Custom render for form field */
  inputProps?: Record<string, unknown>;
  /** Group heading in form */
  group?: string;
  /** Width for table column */
  width?: string;
  /** Whether field appears in table */
  showInTable?: boolean;
  /** Whether field appears in form */
  showInForm?: boolean;
}

export interface BulkAction {
  label: string;
  action: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive" | "warning";
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
}

export interface ResourcePermissions {
  create?: string;
  read?: string;
  update?: string;
  delete?: string;
  archive?: string;
  export?: string;
  import?: string;
}

export interface ResourceFeatures {
  create: boolean;
  update: boolean;
  del: boolean;
  archive: boolean;
  restore: boolean;
  bulkDelete: boolean;
  bulkArchive: boolean;
  bulkRestore: boolean;
  export: boolean;
  import: boolean;
  history: boolean;
  search: boolean;
  sorting: boolean;
  filtering: boolean;
  pagination: boolean;
}

export interface ResourceConfig<T = Record<string, unknown>> {
  name: string;
  nameSingular: string;
  description: string;
  icon: string;
  path: string;
  parentPath?: string;
  endpoint: string;
  fields: FieldDef[];
  permissions?: ResourcePermissions;
  features?: Partial<ResourceFeatures>;
  defaultSort?: { key: string; dir: "asc" | "desc" };
  pageSize?: number;
  bulkActions?: BulkAction[];
  /** Fields shown in advanced filter panel */
  filterFields?: string[];
  /** Tabs for grouping content (e.g. All | Published | Drafts) */
  tabs?: { label: string; value: string; filter: Record<string, unknown> }[];
  /** Linked resources for nested routes */
  parentResource?: string;
}

export interface ResourceTab {
  label: string;
  value: string;
  count?: number;
}

export type ViewMode = "table" | "grid";

export interface TableState {
  search: string;
  page: number;
  pageSize: number;
  sortKey: string;
  sortDir: "asc" | "desc";
  filters: Record<string, string[]>;
  selected: string[];
  view: ViewMode;
}
