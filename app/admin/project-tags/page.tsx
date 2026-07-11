"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface ProjectTag {
  _id: string;
  name: string;
  color?: string;
}

export default function ProjectTagsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "project-tags" });
  const items: ProjectTag[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Project Tags</h1>
          <p className="text-sm text-text-secondary mt-1">Manage tags for projects</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Tag
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <Tag className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No project tags yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-wrap gap-3">
          {items.map((item: ProjectTag) => (
            <Card key={item._id} className="border-border-subtle bg-surface hover:border-border transition-all">
              <CardContent className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm font-medium text-text-primary">{item.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
