'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Search,
  Pin,
  Trash2,
  MoreVertical,
  Settings,
  Clock,
  ChevronLeft,
} from 'lucide-react';
import { sampleConversations, type Conversation } from '@/lib/data';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({
  isOpen,
  onToggle,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(sampleConversations);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter((c) => c.isPinned);
  const recentConversations = filteredConversations.filter((c) => !c.isPinned);

  return (
    <>
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-void-light border-r border-white/5 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-spinoza-yellow/20 border border-spinoza-yellow/50 flex items-center justify-center">
                    <span className="text-spinoza-yellow text-sm font-bold">S</span>
                  </div>
                  <span className="text-sm font-semibold text-white">Spinoza AI</span>
                </div>
                <button
                  onClick={onToggle}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* New chat button */}
              <button
                onClick={onNewChat}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-spinoza-yellow/10 hover:bg-spinoza-yellow/20 border border-spinoza-yellow/30 rounded-lg text-spinoza-yellow text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Search */}
            <div className="p-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-void rounded-lg border border-white/10">
                <Search className="w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder-neutral-500"
                />
              </div>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-auto px-2 pb-4">
              {/* Pinned */}
              {pinnedConversations.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-neutral-500 uppercase tracking-wider">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </div>
                  {pinnedConversations.map((conv) => (
                    <ConversationItem
                      key={conv.id}
                      conversation={conv}
                      isActive={activeConversationId === conv.id}
                      onClick={() => onSelectConversation(conv.id)}
                    />
                  ))}
                </div>
              )}

              {/* Recent */}
              <div>
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-neutral-500 uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  Recent
                </div>
                {recentConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={activeConversationId === conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors group
        ${isActive
          ? 'bg-spinoza-yellow/10 border border-spinoza-yellow/30'
          : 'hover:bg-white/5 border border-transparent'
        }
      `}
    >
      <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-spinoza-yellow' : 'text-neutral-500'}`} />
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium truncate ${isActive ? 'text-spinoza-yellow' : 'text-white'}`}>
          {conversation.title}
        </div>
        <div className="text-[11px] text-neutral-500 truncate mt-0.5">
          {conversation.lastMessage}
        </div>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-600">
          <span>{getTimeAgo(conversation.timestamp)}</span>
          <span>•</span>
          <span>{conversation.messageCount} messages</span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="p-1 text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
      >
        <MoreVertical className="w-3.5 h-3.5" />
      </button>
    </motion.button>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
