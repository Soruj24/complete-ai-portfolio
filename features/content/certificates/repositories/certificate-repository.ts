import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_CERTIFICATES } from "../constants/mock-data";
import type { Certificate } from "../types";

interface CertEntity extends Certificate { _id: string; }

export class CertificateRepository extends MockRepository<CertEntity> {
  constructor() { super({ baseUrl: "", resourceName: "certificates" }); }
  protected searchFields: (keyof CertEntity)[] = ["name", "description", "skills"];
  protected generateMockData(): CertEntity[] { return MOCK_CERTIFICATES.map((c) => ({ ...c, _id: c.id })); }
}

export const certificateRepository = new CertificateRepository();
