export interface SettingField {
  id: string;
  label: string;
  description: string;
  type: "text" | "toggle" | "select" | "number";
  value: string | boolean | number;
  options?: { label: string; value: string }[];
  category: string;
}
