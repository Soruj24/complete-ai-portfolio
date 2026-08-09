"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectFormData, ProjectStatus } from "../types";
import { EMPTY_PROJECT_FORM } from "../types";

function projectToForm(project: Project): ProjectFormData {
  return {
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
    fullDescription: project.fullDescription || "",
    category: project.category || "",
    status: project.status || "draft",
    featured: project.featured || false,
    image: project.image || "",
    techStack: project.techStack || project.technologies || [],
    demoUrl: project.demoUrl || "",
    repoUrl: project.repoUrl || "",
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    client: project.client || "",
    difficulty: project.difficulty || "",
    duration: project.duration || "",
    teamSize: project.teamSize?.toString() || "",
    features: project.features || [],
    challenges: project.challenges || [],
    solutions: project.solutions || [],
    caseStudyProblem: project.caseStudy?.problem || "",
    caseStudySolution: project.caseStudy?.solution || "",
    caseStudyResults: project.caseStudy?.results || [],
    seoTitle: project.seoTitle || "",
    metaDescription: project.metaDescription || "",
    tags: project.tags || [],
  };
}

function formToPayload(form: ProjectFormData) {
  return {
    title: form.title,
    slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description: form.description,
    fullDescription: form.fullDescription || undefined,
    category: form.category,
    status: form.status,
    featured: form.featured,
    image: form.image || "https://via.placeholder.com/800x450",
    technologies: form.techStack,
    techStack: form.techStack,
    features: form.features,
    challenges: form.challenges,
    solutions: form.solutions,
    githubUrl: form.githubUrl || undefined,
    liveUrl: form.liveUrl || undefined,
    demoUrl: form.demoUrl || undefined,
    repoUrl: form.repoUrl || undefined,
    client: form.client || undefined,
    difficulty: form.difficulty || undefined,
    duration: form.duration || undefined,
    teamSize: form.teamSize || undefined,
    seoTitle: form.seoTitle || undefined,
    metaDescription: form.metaDescription || undefined,
    tags: form.tags,
    caseStudy: form.caseStudyProblem || form.caseStudySolution ? {
      problem: form.caseStudyProblem,
      solution: form.caseStudySolution,
      results: form.caseStudyResults,
    } : undefined,
  };
}

interface UseProjectEditorReturn {
  project: Project | null;
  form: ProjectFormData;
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  errors: Record<string, string>;
  previewOpen: boolean;
  updateField: <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => void;
  saveDraft: () => Promise<string | null>;
  publish: () => Promise<string | null>;
  save: () => Promise<string | null>;
  validate: () => boolean;
  reset: () => void;
  togglePreview: () => void;
  loadProject: (id: string) => Promise<void>;
}

export function useProjectEditor(initialId?: string): UseProjectEditorReturn {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormData>({ ...EMPTY_PROJECT_FORM });
  const [initialForm, setInitialForm] = useState<ProjectFormData>({ ...EMPTY_PROJECT_FORM });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const dirtyRef = useRef(false);

  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  const loadProject = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed to load project");
      const json = await res.json();
      const proj = json.data as Project;
      setProject(proj);
      const formData = projectToForm(proj);
      setForm(formData);
      setInitialForm(formData);
    } catch {
      // error handled
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialId) {
      loadProject(initialId);
    }
  }, [initialId, loadProject]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const updateField = useCallback(<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !project) {
        next.slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, [project]);

  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (form.title.length > 100) errs.title = "Title must be 100 characters or less";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.description.length < 10) errs.description = "Description must be at least 10 characters";
    if (!form.category.trim()) errs.category = "Category is required";
    if (form.demoUrl && !/^https?:\/\/.+/.test(form.demoUrl)) errs.demoUrl = "Must be a valid URL";
    if (form.repoUrl && !/^https?:\/\/.+/.test(form.repoUrl)) errs.repoUrl = "Must be a valid URL";
    if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) errs.githubUrl = "Must be a valid URL";
    if (form.liveUrl && !/^https?:\/\/.+/.test(form.liveUrl)) errs.liveUrl = "Must be a valid URL";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const saveToApi = useCallback(async (statusOverride?: ProjectStatus): Promise<string | null> => {
    if (!validate()) return null;
    setSaving(true);
    try {
      const payload = formToPayload({ ...form, status: statusOverride || form.status });
      const isEditing = !!project;
      const url = isEditing ? `/api/projects/${project.id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json();
        if (json.error?.details) {
          setErrors(json.error.details);
        }
        return null;
      }

      const json = await res.json();
      const saved = json.data as Project;
      setProject(saved);
      const formData = projectToForm(saved);
      setForm(formData);
      setInitialForm(formData);
      return saved.id;
    } catch {
      return null;
    } finally {
      setSaving(false);
    }
  }, [form, project, validate]);

  const saveDraft = useCallback(async (): Promise<string | null> => {
    return saveToApi(form.status === "published" ? "draft" : form.status);
  }, [saveToApi, form.status]);

  const publish = useCallback(async (): Promise<string | null> => {
    return saveToApi("published");
  }, [saveToApi]);

  const save = useCallback(async (): Promise<string | null> => {
    return saveToApi();
  }, [saveToApi]);

  const reset = useCallback(() => {
    setForm({ ...initialForm });
    setErrors({});
  }, [initialForm]);

  const togglePreview = useCallback(() => {
    setPreviewOpen((prev) => !prev);
  }, []);

  return {
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
    validate,
    reset,
    togglePreview,
    loadProject,
  };
}
