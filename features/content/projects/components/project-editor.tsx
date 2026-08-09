"use client";

import { Loader2 } from "lucide-react";
import { useProjectEditor } from "../hooks/use-project-editor";
import { EditorToolbar } from "./editor-toolbar";
import { EditorMain } from "./editor-main";
import { EditorSidebar } from "./editor-sidebar";
import { EditorPreview } from "./editor-preview";

interface Props {
  projectId?: string;
}

export function ProjectEditor({ projectId }: Props) {
  const {
    project,
    form,
    dirty,
    loading,
    saving,
    errors,
    previewOpen,
    updateField,
    saveDraft,
    publish,
    save,
    togglePreview,
  } = useProjectEditor(projectId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-text-tertiary" />
      </div>
    );
  }

  const title = project ? `Edit: ${project.title}` : "New Project";

  return (
    <div className="min-h-screen">
      <EditorToolbar
        title={title}
        dirty={dirty}
        saving={saving}
        previewOpen={previewOpen}
        onSaveDraft={saveDraft}
        onPublish={publish}
        onSave={save}
        onTogglePreview={togglePreview}
      />

      <div className="p-5 md:p-6">
        {previewOpen ? (
          <div className="max-w-2xl mx-auto">
            <EditorPreview form={form} />
          </div>
        ) : (
          <div className="flex gap-6 lg:flex-row flex-col">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <EditorMain form={form} errors={errors} onUpdate={updateField} />
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="lg:sticky lg:top-24">
                <EditorSidebar form={form} errors={errors} onUpdate={updateField} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
