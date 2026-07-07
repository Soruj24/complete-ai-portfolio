"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function QuickLinksCard() {
  return (
    <Card className="border border-border-subtle rounded-xl shadow-none bg-surface">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-text-tertiary" /> Quick Links
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Button variant="outline" className="w-full h-9 rounded-lg text-xs font-medium border-border-subtle text-error/70 hover:text-error">
          <Trash2 className="h-3.5 w-3.5 mr-2" />
          Clear Cache
        </Button>
      </CardContent>
    </Card>
  );
}
