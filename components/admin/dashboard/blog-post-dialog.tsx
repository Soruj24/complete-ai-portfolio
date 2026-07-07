"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import { FileText, Plus } from "lucide-react";
import type { CreateBlogRequest as BlogPostData } from "@/shared/types";

interface BlogPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogPost: BlogPostData;
  onBlogPostChange: (post: BlogPostData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BlogPostDialog({ open, onOpenChange, blogPost, onBlogPostChange, onSubmit }: BlogPostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 rounded-lg text-xs gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-text-tertiary" />
            Create Blog Post
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label>Post Title</Label>
            <Input required value={blogPost.title} onChange={(e) => onBlogPostChange({ ...blogPost, title: e.target.value })} placeholder="Enter post title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input required value={blogPost.category} onChange={(e) => onBlogPostChange({ ...blogPost, category: e.target.value })} placeholder="e.g. Security" />
            </div>
            <div className="space-y-2">
              <Label>Featured Image</Label>
              <div className="flex gap-2">
                <Input required value={blogPost.image} onChange={(e) => onBlogPostChange({ ...blogPost, image: e.target.value })} placeholder="https://..." className="flex-1" />
                <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => { if (result.info && typeof result.info !== "string") { onBlogPostChange({ ...blogPost, image: result.info.secure_url }); } }}>
                  {({ open }) => (
                    <Button type="button" onClick={() => open()} variant="outline" size="sm" className="h-10">Upload</Button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Short Excerpt</Label>
            <Input required value={blogPost.excerpt} onChange={(e) => onBlogPostChange({ ...blogPost, excerpt: e.target.value })} placeholder="Brief summary of the post" />
          </div>
          <div className="space-y-2">
            <Label>Content (Markdown supported)</Label>
            <Textarea required value={blogPost.content} onChange={(e) => onBlogPostChange({ ...blogPost, content: e.target.value })} placeholder="Write your blog content here..." className="min-h-[180px]" />
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} size="sm">Cancel</Button>
            <Button type="submit" size="sm">Publish Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
