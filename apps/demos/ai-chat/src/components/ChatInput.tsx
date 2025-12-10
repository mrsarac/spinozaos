'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { quickActions, type Attachment } from '@/lib/data';

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    if (isLoading) return;

    onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
    setMessage('');
    setAttachments([]);
    setShowQuickActions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: `attachment-${Date.now()}-${Math.random()}`,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
      size: file.size,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleQuickAction = (prompt: string) => {
    onSendMessage(prompt);
    setShowQuickActions(false);
  };

  return (
    <div className="border-t border-white/5 bg-void-light/50 p-4">
      {/* Quick actions */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-void border border-white/10 hover:border-spinoza-yellow/30 hover:bg-spinoza-yellow/5 rounded-full text-neutral-300 hover:text-spinoza-yellow transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachments preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {attachments.map((attachment) => (
              <motion.div
                key={attachment.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative group"
              >
                {attachment.type === 'image' && attachment.url ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-void-lighter rounded-lg border border-white/10">
                    <FileText className="w-4 h-4 text-spinoza-yellow" />
                    <span className="text-xs text-white max-w-[100px] truncate">
                      {attachment.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 flex items-end gap-2 px-4 py-3 bg-void rounded-2xl border border-white/10 input-focus transition-all">
          {/* Attachment button */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.md,.json"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1 text-neutral-500 hover:text-spinoza-yellow transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Image button */}
          <button
            type="button"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = 'image/*';
                fileInputRef.current.click();
                fileInputRef.current.accept = 'image/*,.pdf,.txt,.md,.json';
              }
            }}
            className="p-1 text-neutral-500 hover:text-spinoza-yellow transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              // Auto-resize
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="Message Spinoza..."
            rows={1}
            className="flex-1 bg-transparent text-white outline-none resize-none placeholder-neutral-500 max-h-[200px]"
            style={{ height: 'auto' }}
          />

          {/* Voice button */}
          <button
            type="button"
            className="p-1 text-neutral-500 hover:text-spinoza-yellow transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={(!message.trim() && attachments.length === 0) || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            p-3 rounded-xl transition-all
            ${message.trim() || attachments.length > 0
              ? 'bg-spinoza-yellow text-void glow-yellow'
              : 'bg-void-lighter text-neutral-500'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>

      {/* Footer hint */}
      <p className="text-center text-[10px] text-neutral-600 mt-3">
        Spinoza can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
