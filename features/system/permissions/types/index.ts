export interface Permission {
  id: string;
  name: string;
  key: string;
  description: string;
  group: string;
  roles: string[];
}
export interface PermissionGroup {
  name: string;
  permissions: Permission[];
}
