// AI Chat Demo Data

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  isStreaming?: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'code';
  name: string;
  url?: string;
  size?: number;
  language?: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  isPinned?: boolean;
}

// Sample conversations for history
export const sampleConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'SpinozaOS Architecture',
    lastMessage: 'The component library follows atomic design...',
    timestamp: new Date(Date.now() - 3600000),
    messageCount: 12,
    isPinned: true,
  },
  {
    id: 'conv-2',
    title: 'React Performance Tips',
    lastMessage: 'Use React.memo for expensive renders...',
    timestamp: new Date(Date.now() - 86400000),
    messageCount: 8,
  },
  {
    id: 'conv-3',
    title: 'TypeScript Generics',
    lastMessage: 'Generic constraints allow you to...',
    timestamp: new Date(Date.now() - 172800000),
    messageCount: 15,
  },
  {
    id: 'conv-4',
    title: 'CSS Grid Layout',
    lastMessage: 'Grid template areas provide semantic...',
    timestamp: new Date(Date.now() - 259200000),
    messageCount: 6,
  },
  {
    id: 'conv-5',
    title: 'Framer Motion',
    lastMessage: 'AnimatePresence handles exit animations...',
    timestamp: new Date(Date.now() - 345600000),
    messageCount: 9,
  },
];

// Initial messages for the demo conversation
export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: `Hello! I'm **Spinoza**, your AI assistant powered by SpinozaOS design principles.

I can help you with:
- 🎨 Design system questions
- 💻 Code examples and explanations
- 📚 Documentation and best practices
- 🔧 Troubleshooting and debugging

Feel free to ask me anything, share images, or paste code snippets!`,
    timestamp: new Date(Date.now() - 60000),
  },
];

// Sample AI responses for demo
export const sampleResponses: Record<string, string> = {
  default: `I understand you're asking about that topic. Let me provide a comprehensive answer...

Here's what you need to know:

1. **First Point** - This is an important consideration that affects how we approach the problem.

2. **Second Point** - Building on the previous point, we can see that...

3. **Third Point** - Finally, it's worth noting that...

Would you like me to elaborate on any of these points?`,

  code: `Here's a code example that demonstrates this concept:

\`\`\`typescript
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function AnimatedButton({ children, onClick }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="px-4 py-2 bg-spinoza-yellow text-void rounded-lg"
    >
      {children}
    </motion.button>
  );
}
\`\`\`

This component uses Framer Motion's spring physics for natural-feeling animations. The \`whileHover\` and \`whileTap\` props handle the interactive states.`,

  design: `Great question about design! Here are some SpinozaOS design principles:

### Color Philosophy
- **Void-first**: Deep blacks (#020617) as the foundation
- **Prophetic Gold**: Single accent color (#fbbf24) for mystical aesthetic
- **Semantic colors**: Green for success, red for errors

### Motion Guidelines
- Use spring physics with \`stiffness: 300-500\`
- Keep animations under 300ms for responsiveness
- Respect \`prefers-reduced-motion\`

### Typography
- **Serif** for display headings
- **Sans** for UI and body
- **Mono** for data and code

Would you like specific examples for any of these?`,
};

// Typing simulation text chunks
export function getStreamingChunks(text: string): string[] {
  const words = text.split(' ');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const word of words) {
    currentChunk += (currentChunk ? ' ' : '') + word;
    // Create chunks of roughly 3-5 words
    if (Math.random() > 0.6 || currentChunk.includes('\n')) {
      chunks.push(currentChunk);
      currentChunk = '';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Quick action prompts
export const quickActions = [
  { label: 'Explain SpinozaOS', prompt: 'What is SpinozaOS and what are its core principles?' },
  { label: 'Show code example', prompt: 'Show me a code example of a SpinozaOS button component' },
  { label: 'Design tips', prompt: 'What are the best practices for dark UI design?' },
  { label: 'Animation guide', prompt: 'How should I approach animations in SpinozaOS?' },
];
