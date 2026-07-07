import { certificateRepository } from "../repositories/certificate-repository";
import type { Certificate } from "../types";

export class CertificateService {
  async getAll(): Promise<Certificate[]> {
    const result = await certificateRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Certificate>): Promise<Certificate> {
    return certificateRepository.create(data).then((r) => r.data);
  }
}

export const certificateService = new CertificateService();
