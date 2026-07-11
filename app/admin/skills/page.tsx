"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Code2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface Skill {
  _id: string;
  name: string;
  category?: string;
  level?: string;
  yearsOfExperience?: number;
}

export default function SkillsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "skills" });
  const items: Skill[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Skills</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your technical skills</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Skill
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
            <Code2 className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No skills yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item: Skill) => (
            <Card key={item._id} className="border-border-subtle bg-surface hover:border-border transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10">
                    <Code2 className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-text-primary">{item.name}</h3>
                      {item.category && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-text-tertiary">
                      {item.level && <span>{item.level}</span>}
                      {item.yearsOfExperience !== undefined && <span>{item.yearsOfExperience} years</span>}
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
