"use client";

import { useParams } from "next/navigation";
import { ProjectEditor } from "@/features/content/projects/components/project-editor";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  return <ProjectEditor projectId={id} />;
}
