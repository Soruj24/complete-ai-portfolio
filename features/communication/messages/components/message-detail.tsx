"use client";

import { motion } from "framer-motion";
import { X, Reply, Trash2, Flag, ArrowLeft, Mail, Globe, Clock } from "lucide-react";
import type { Message } from "../types";

interface Props {
  message: Message;
  onClose: () => void;
  onToggleFlag: (id: string) => void;
}

export function MessageDetail({ message, onClose, onToggleFlag }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="rounded-xl border border-border-primary bg-surface-primary"
    >
      <div className="flex items-center justify-between border-b border-border-primary p-4">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary lg:hidden">
            <ArrowLeft size={16} />
          </button>
          <h3 className="text-sm font-semibold text-text-primary">Message Details</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onToggleFlag(message.id)} className={`rounded-lg p-1.5 transition-colors hover:bg-surface-hover ${message.status === "flagged" ? "text-warning" : "text-text-tertiary hover:text-text-primary"}`}>
            <Flag size={16} />
          </button>
          <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary">
            <Trash2 size={16} />
          </button>
          <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-accent">
            <Reply size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-text-primary">{message.subject}</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
              {message.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{message.name}</p>
              <p className="text-xs text-text-tertiary">{message.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1"><Clock size={12} />{new Date(message.createdAt).toLocaleString()}</span>
          <span className="flex items-center gap-1"><Mail size={12} />{message.source}</span>
          {message.ip && <span className="flex items-center gap-1"><Globe size={12} />{message.ip}</span>}
        </div>

        <div className="rounded-lg bg-surface-secondary p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
            {message.content}
          </p>
        </div>

        {message.readAt && (
          <p className="mt-4 text-xs text-text-tertiary">
            Read at {new Date(message.readAt).toLocaleString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
