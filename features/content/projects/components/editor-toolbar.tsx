"use client";

import { ArrowLeft, Eye, EyeOff, Save, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  dirty: boolean;
  saving: boolean;
  previewOpen: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  onSave: () => void;
  onTogglePreview: () => void;
}

export function EditorToolbar({
  title,
  dirty,
  saving,
  previewOpen,
  onSaveDraft,
  onPublish,
  onSave,
  onTogglePreview,
}: Props) {
  const router = useRouter();

  return (
    <div className="sticky top-12 z-20 flex items-center justify-between gap-4 border-b border-border-subtle bg-background/80 backdrop-blur-xl px-5 py-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/projects")}
          className="h-7 w-7 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-[14px] font-semibold text-text-primary truncate">{title}</h1>
          {dirty && (
            <p className="text-[10px] text-amber-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePreview}
          className="h-7 text-[12px] gap-1.5"
        >
          {previewOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {previewOpen ? "Edit" : "Preview"}
        </Button>

        <div className="h-4 w-px bg-border-subtle mx-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          disabled={saving}
          className="h-7 text-[12px] gap-1.5"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save Draft
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={saving}
          className="h-7 text-[12px] gap-1.5"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save
        </Button>

        <Button
          size="sm"
          onClick={onPublish}
          disabled={saving}
          className="h-7 text-[12px] gap-1.5"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          Publish
        </Button>
      </div>
    </div>
  );
}
