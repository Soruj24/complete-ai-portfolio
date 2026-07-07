import { MockRepository } from "@/shared/repositories/mock-repository";
import { MOCK_TESTIMONIALS } from "../constants/mock-data";
import type { Testimonial } from "../types";

interface TestEntity extends Testimonial { _id: string; }

export class TestimonialRepository extends MockRepository<TestEntity> {
  constructor() { super({ baseUrl: "", resourceName: "testimonials" }); }
  protected searchFields: (keyof TestEntity)[] = ["name", "company", "content"];
  protected generateMockData(): TestEntity[] { return MOCK_TESTIMONIALS.map((t) => ({ ...t, _id: t.id })); }
}

export const testimonialRepository = new TestimonialRepository();
