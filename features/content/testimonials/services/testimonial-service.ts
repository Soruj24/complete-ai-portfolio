import { testimonialRepository } from "../repositories/testimonial-repository";
import type { Testimonial } from "../types";

export class TestimonialService {
  async getAll(): Promise<Testimonial[]> {
    const result = await testimonialRepository.getAll();
    return result.data;
  }

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    return testimonialRepository.create(data).then((r) => r.data);
  }
}

export const testimonialService = new TestimonialService();
