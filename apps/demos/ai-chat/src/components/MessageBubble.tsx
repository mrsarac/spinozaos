'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, Image as ImageIcon, FileText } from 'lucide-react';
import type { Message, Attachment } from '@/lib/data';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
          ${isUser
            ? 'bg-spinoza-yellow text-void'
            : 'bg-void-lighter border border-white/10 text-spinoza-yellow'
          }
        `}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message content */}
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`
            message-bubble relative px-4 py-3 rounded-2xl
            ${isUser
              ? 'message-bubble-user bg-spinoza-yellow text-void'
              : 'message-bubble-assistant bg-void-lighter border border-white/5 text-white'
            }
          `}
        >
          <div className="message-content">
            <MessageContent content={message.content} isStreaming={isStreaming} />
          </div>

          {/* Streaming cursor */}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-spinoza-yellow cursor-blink ml-0.5" />
          )}
        </div>

        {/* Timestamp and actions */}
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-neutral-600">
            {message.timestamp.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {!isUser && !isStreaming && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ActionButton
                icon={copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                onClick={handleCopy}
                tooltip="Copy"
              />
              <ActionButton
                icon={<ThumbsUp className="w-3 h-3" />}
                onClick={() => {}}
                tooltip="Good response"
              />
              <ActionButton
                icon={<ThumbsDown className="w-3 h-3" />}
                onClick={() => {}}
                tooltip="Bad response"
              />
              <ActionButton
                icon={<RefreshCw className="w-3 h-3" />}
                onClick={() => {}}
                tooltip="Regenerate"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MessageContent({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
  // Simple markdown-like parsing
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, i) => {
      // Code block start
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          // Code block end
          elements.push(
            <CodeBlock key={`code-${i}`} code={codeContent.trim()} language={codeLanguage} />
          );
          inCodeBlock = false;
          codeLanguage = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-base font-semibold text-white mt-3 mb-2">
            {parseInlineMarkdown(line.slice(4))}
          </h3>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-white mt-3 mb-2">
            {parseInlineMarkdown(line.slice(3))}
          </h2>
        );
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-xl font-semibold text-white mt-3 mb-2">
            {parseInlineMarkdown(line.slice(2))}
          </h1>
        );
        return;
      }

      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-4 list-disc">
            {parseInlineMarkdown(line.slice(2))}
          </li>
        );
        return;
      }

      // Numbered list
      const numberedMatch = line.match(/^(\d+)\. /);
      if (numberedMatch) {
        elements.push(
          <li key={i} className="ml-4 list-decimal">
            {parseInlineMarkdown(line.slice(numberedMatch[0].length))}
          </li>
        );
        return;
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<br key={i} />);
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="mb-2">
          {parseInlineMarkdown(line)}
        </p>
      );
    });

    return elements;
  };

  return <div className="text-sm leading-relaxed">{renderContent()}</div>;
}

function parseInlineMarkdown(text: string): React.ReactNode {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-3 relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-void border-b border-white/10">
        <span className="text-xs text-neutral-500 font-mono">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-neutral-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  if (attachment.type === 'image') {
    return (
      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-void-lighter flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-neutral-500" />
        </div>
        {attachment.url && (
          <img
            src={attachment.url}
            alt={attachment.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-void-lighter rounded-lg border border-white/10">
      <FileText className="w-4 h-4 text-spinoza-yellow" />
      <div>
        <div className="text-sm text-white">{attachment.name}</div>
        {attachment.size && (
          <div className="text-[10px] text-neutral-500">
            {(attachment.size / 1024).toFixed(1)} KB
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  onClick,
  tooltip,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="p-1 text-neutral-500 hover:text-white hover:bg-white/10 rounded transition-colors"
    >
      {icon}
    </button>
  );
}
