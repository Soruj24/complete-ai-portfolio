"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Quote } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  rating?: number;
  avatarUrl?: string;
}

export default function TestimonialsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "testimonials" });
  const items: Testimonial[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Testimonials</h1>
          <p className="text-sm text-text-secondary mt-1">Manage client and colleague testimonials</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <Quote className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No testimonials yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item: Testimonial) => (
            <Card key={item._id} className="border-border-subtle bg-surface hover:border-border transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10">
                    <Quote className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-tertiary italic line-clamp-3">&ldquo;{item.content}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{item.name}</p>
                        {(item.role || item.company) && (
                          <p className="text-[10px] text-text-tertiary">{item.role}{item.role && item.company ? " at " : ""}{item.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
