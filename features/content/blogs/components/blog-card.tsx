"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MessageSquare, Clock } from "lucide-react";
import type { BlogPost } from "../types";
import { BLOG_STATUS_LABELS } from "../types";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-surface-hover text-text-tertiary",
  review: "bg-warning/10 text-warning",
  published: "bg-success/10 text-success",
  archived: "bg-error/10 text-error",
};

interface Props { post: BlogPost; index: number; }

export function BlogCard({ post, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary line-clamp-1">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-text-tertiary">{post.excerpt}</p>
        </div>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[post.status]}`}>
          {BLOG_STATUS_LABELS[post.status]}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">{post.category}</span>
        {post.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-tertiary">
        <span className="flex items-center gap-1"><Clock size={14} />{post.readingTime} min</span>
        <span className="flex items-center gap-1"><Eye size={14} />{post.views?.toLocaleString() ?? 0}</span>
        <span className="flex items-center gap-1"><Heart size={14} />{post.likes}</span>
        <span className="flex items-center gap-1"><MessageSquare size={14} />{post.comments}</span>
      </div>

      {post.featured && (
        <div className="mt-3">
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">Featured</span>
        </div>
      )}
    </motion.div>
  );
}
