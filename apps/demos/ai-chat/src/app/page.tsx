'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, Sparkles } from 'lucide-react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatInput } from '@/components/ChatInput';
import { MessageBubble } from '@/components/MessageBubble';
import { TypingIndicator } from '@/components/TypingIndicator';
import { sampleResponses, type Message, type Attachment } from '@/lib/data';

export default function AIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to **Spinoza AI** - your intelligent assistant powered by advanced language models.

I can help you with:
- **Code generation** and debugging
- **Data analysis** and visualization
- **Creative writing** and brainstorming
- **Research** and explanations

How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate streaming response
  const streamResponse = async (fullContent: string, messageId: string) => {
    const words = fullContent.split(' ');
    let currentContent = '';

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i];

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentContent } : msg
        )
      );

      // Random delay between 20-80ms per word for natural feel
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 60 + 20)
      );
    }

    // Mark as no longer streaming
    setStreamingMessageId(null);
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string, attachments?: Attachment[]) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get a response based on message content
    let responseContent = getContextualResponse(content);

    // Create assistant message
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setStreamingMessageId(assistantMessageId);

    // Stream the response
    await streamResponse(responseContent, assistantMessageId);
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for specific topics
    if (lowerMessage.includes('code') || lowerMessage.includes('function') || lowerMessage.includes('programming')) {
      return sampleResponses.code;
    }
    if (lowerMessage.includes('explain') || lowerMessage.includes('how') || lowerMessage.includes('what is')) {
      return sampleResponses.explanation;
    }
    if (lowerMessage.includes('analyze') || lowerMessage.includes('data') || lowerMessage.includes('statistics')) {
      return sampleResponses.analysis;
    }
    if (lowerMessage.includes('creative') || lowerMessage.includes('write') || lowerMessage.includes('story')) {
      return sampleResponses.creative;
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return sampleResponses.help;
    }

    // Default response
    return sampleResponses.general;
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 'welcome-new',
        role: 'assistant',
        content: `Starting a new conversation. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
    setActiveConversationId(`new-${Date.now()}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-void text-white">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
      />

      {/* Main content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : ''
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-void/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-spinoza-yellow/20 border border-spinoza-yellow/50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-spinoza-yellow" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">Spinoza AI</h1>
                <p className="text-[10px] text-neutral-500">GPT-4 Turbo</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2 py-1 text-[10px] font-mono text-spinoza-yellow bg-spinoza-yellow/10 border border-spinoza-yellow/30 rounded">
              v2.0.0
            </div>
          </div>
        </header>

        {/* Messages area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isStreaming={message.id === streamingMessageId}
                />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isLoading && !streamingMessageId && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input area */}
        <div className="sticky bottom-0">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
