import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_DOWNLOADS } from "../constants/mock-data";
import type { Download } from "../types";

interface DlEntity extends Download { _id: string; }

export class DownloadRepository extends MockRepository<DlEntity> {
  constructor() { super({ baseUrl: "", resourceName: "downloads" }); }
  protected searchFields: (keyof DlEntity)[] = ["name", "description", "category"];
  protected generateMockData(): DlEntity[] { return MOCK_DOWNLOADS.map((d) => ({ ...d, _id: d.id })); }
}

export const downloadRepository = new DownloadRepository();
