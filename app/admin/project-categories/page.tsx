"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface ProjectCategory {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
}

export default function ProjectCategoriesPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "project-categories" });
  const items: ProjectCategory[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Project Categories</h1>
          <p className="text-sm text-text-secondary mt-1">Manage project categories</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <FolderTree className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No project categories yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item: ProjectCategory) => (
            <Card key={item._id} className="border-border-subtle bg-surface hover:border-border transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10">
                    <FolderTree className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-text-primary">{item.name}</h3>
                    {item.slug && <p className="text-[10px] font-mono text-text-tertiary mt-0.5">/{item.slug}</p>}
                    {item.description && <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{item.description}</p>}
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
