"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface Education {
  _id: string;
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  gpa?: string;
}

export default function EducationPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "education" });
  const items: Education[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Education</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your educational background</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Education
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
            <GraduationCap className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No education entries yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item: Education) => (
            <Card key={item._id} className="border-border-subtle bg-surface hover:border-border transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-text-primary">{item.institution}</h3>
                    {(item.degree || item.field) && (
                      <p className="text-xs text-text-secondary mt-1">
                        {item.degree}{item.degree && item.field ? " in " : ""}{item.field}
                      </p>
                    )}
                    {item.description && <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{item.description}</p>}
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-text-tertiary">
                      {item.startDate && <span>{item.startDate} – {item.endDate || "Present"}</span>}
                      {item.gpa && <span>GPA: {item.gpa}</span>}
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
