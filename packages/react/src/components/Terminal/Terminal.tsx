// Terminal - Interactive CLI component with hacker aesthetic
// SpinozaOS design system - Substance inspired

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { SPRING, DURATION } from '@spinozaos/motion';
import { cn } from '../../utils';

// ============================================================================
// Types
// ============================================================================

export interface TerminalLine {
  /** Unique identifier for the line */
  id: string;
  /** Type of terminal line affecting display style */
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'system';
  /** Content to display */
  content: string;
  /** Timestamp for the line */
  timestamp?: Date;
}

export interface TerminalProps {
  /** Array of lines to display */
  lines?: TerminalLine[];
  /** Command prompt string */
  prompt?: string;
  /** Callback when command is submitted */
  onCommand?: (command: string) => void | Promise<void>;
  /** Custom command handlers */
  commands?: Record<string, (args: string[]) => string | Promise<string>>;
  /** Welcome message displayed on mount */
  welcomeMessage?: string;
  /** Maximum history entries to store */
  maxHistory?: number;
  /** Show timestamps for each line */
  showTimestamps?: boolean;
  /** Disable input */
  readOnly?: boolean;
  /** Auto scroll to bottom on new output */
  autoScroll?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Variants
// ============================================================================

const terminalVariants = cva(
  [
    'relative overflow-hidden',
    'bg-void border border-white/10 rounded-xl',
    'font-mono text-sm',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-[200px] max-h-[300px]',
        md: 'min-h-[300px] max-h-[500px]',
        lg: 'min-h-[400px] max-h-[700px]',
        full: 'h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const lineTypeVariants = cva(
  'leading-relaxed whitespace-pre-wrap break-words',
  {
    variants: {
      type: {
        input: 'text-spinoza-yellow',
        output: 'text-neutral-300',
        error: 'text-red-400',
        success: 'text-green-400',
        info: 'text-blue-400',
        system: 'text-neutral-500 italic',
      },
    },
    defaultVariants: {
      type: 'output',
    },
  }
);

// ============================================================================
// Animation Variants
// ============================================================================

const lineAnimationVariants = {
  initial: { opacity: 0, y: 5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: SPRING.tight,
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast },
  },
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook for typewriter effect
 */
function useTypewriter(
  text: string,
  enabled: boolean,
  speed: number = 30
): { displayedText: string; isComplete: boolean } {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, enabled, speed]);

  return { displayedText, isComplete };
}

/**
 * Hook for blinking cursor
 */
function useBlinkingCursor(interval: number = 530): boolean {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVisible((v) => !v);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return visible;
}

// ============================================================================
// Sub-components
// ============================================================================

interface TerminalLineDisplayProps {
  line: TerminalLine;
  showTimestamp?: boolean;
  enableTypewriter?: boolean;
}

function TerminalLineDisplay({
  line,
  showTimestamp,
  enableTypewriter = false,
}: TerminalLineDisplayProps) {
  const shouldTypewrite = enableTypewriter && line.type === 'output';
  const { displayedText } = useTypewriter(line.content, shouldTypewrite);

  const content = shouldTypewrite ? displayedText : line.content;

  return (
    <motion.div
      variants={lineAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex gap-2"
    >
      {showTimestamp && line.timestamp && (
        <span className="text-neutral-600 text-xs shrink-0">
          [{formatTime(line.timestamp)}]
        </span>
      )}
      <span className={lineTypeVariants({ type: line.type })}>{content}</span>
    </motion.div>
  );
}

interface TerminalInputProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  disabled?: boolean;
}

function TerminalInput({
  prompt,
  value,
  onChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  disabled,
}: TerminalInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cursorVisible = useBlinkingCursor();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryDown();
    }
  };

  // Focus input when container is clicked
  React.useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    const container = inputRef.current?.closest('.terminal-container');
    container?.addEventListener('click', handleClick);
    return () => container?.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-spinoza-yellow font-bold shrink-0">{prompt}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'w-full bg-transparent outline-none',
            'text-spinoza-yellow caret-transparent',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        {/* Custom blinking block cursor */}
        <span
          className={cn(
            'absolute top-0 pointer-events-none',
            'w-2 h-5 bg-spinoza-yellow',
            'transition-opacity duration-75',
            cursorVisible ? 'opacity-100' : 'opacity-0'
          )}
          style={{ left: `${value.length * 0.6}em` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// ============================================================================
// Built-in Commands
// ============================================================================

const BUILT_IN_COMMANDS: Record<
  string,
  (
    args: string[],
    context: { history: TerminalLine[]; clearLines: () => void }
  ) => string
> = {
  clear: (_, { clearLines }) => {
    clearLines();
    return '';
  },
  help: () => {
    return `Available commands:
  clear     - Clear terminal
  help      - Show this help message
  history   - Show command history

Type any command and press Enter to execute.`;
  },
  history: (_, { history }) => {
    const inputLines = history.filter((l) => l.type === 'input');
    if (inputLines.length === 0) {
      return 'No command history.';
    }
    return inputLines
      .slice(-10)
      .map((l, i) => `  ${i + 1}. ${l.content}`)
      .join('\n');
  },
};

// ============================================================================
// Main Component
// ============================================================================

export function Terminal({
  lines: controlledLines,
  prompt = 'spinoza>',
  onCommand,
  commands = {},
  welcomeMessage,
  maxHistory = 100,
  showTimestamps = false,
  readOnly = false,
  autoScroll = true,
  className,
}: TerminalProps) {
  // State
  const [internalLines, setInternalLines] = React.useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Refs
  const outputRef = React.useRef<HTMLDivElement>(null);
  const lastLineCountRef = React.useRef(0);

  // Use controlled or internal lines
  const lines = controlledLines ?? internalLines;
  const isControlled = controlledLines !== undefined;

  // Add welcome message on mount
  React.useEffect(() => {
    if (welcomeMessage && !isControlled) {
      setInternalLines([
        {
          id: generateId(),
          type: 'system',
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [welcomeMessage, isControlled]);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (autoScroll && outputRef.current && lines.length > lastLineCountRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
    lastLineCountRef.current = lines.length;
  }, [lines.length, autoScroll]);

  // Add line helper
  const addLine = React.useCallback(
    (line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
      if (isControlled) return;

      setInternalLines((prev) => {
        const newLines = [
          ...prev,
          {
            ...line,
            id: generateId(),
            timestamp: new Date(),
          },
        ];
        // Trim to maxHistory
        if (newLines.length > maxHistory) {
          return newLines.slice(-maxHistory);
        }
        return newLines;
      });
    },
    [isControlled, maxHistory]
  );

  // Clear lines helper
  const clearLines = React.useCallback(() => {
    if (!isControlled) {
      setInternalLines([]);
    }
  }, [isControlled]);

  // Handle command execution
  const handleCommand = React.useCallback(
    async (command: string) => {
      const trimmedCommand = command.trim();
      if (!trimmedCommand) return;

      // Add input line
      addLine({ type: 'input', content: trimmedCommand });

      // Add to command history
      setCommandHistory((prev) => {
        const newHistory = [...prev, trimmedCommand];
        if (newHistory.length > maxHistory) {
          return newHistory.slice(-maxHistory);
        }
        return newHistory;
      });
      setHistoryIndex(-1);

      // Parse command
      const parts = trimmedCommand.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      setIsProcessing(true);

      try {
        // Check built-in commands first
        if (cmd in BUILT_IN_COMMANDS) {
          const result = BUILT_IN_COMMANDS[cmd](args, {
            history: lines,
            clearLines,
          });
          if (result) {
            addLine({ type: 'output', content: result });
          }
        }
        // Check custom commands
        else if (cmd in commands) {
          const result = await commands[cmd](args);
          if (result) {
            addLine({ type: 'output', content: result });
          }
        }
        // Call onCommand callback
        else if (onCommand) {
          await onCommand(trimmedCommand);
        }
        // Unknown command
        else {
          addLine({
            type: 'error',
            content: `Command not found: ${cmd}. Type 'help' for available commands.`,
          });
        }
      } catch (error) {
        addLine({
          type: 'error',
          content: error instanceof Error ? error.message : String(error),
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [addLine, clearLines, commands, lines, maxHistory, onCommand]
  );

  // Handle input submit
  const handleSubmit = () => {
    if (isProcessing || readOnly) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  // History navigation
  const handleHistoryUp = () => {
    if (commandHistory.length === 0) return;

    const newIndex =
      historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);

    setHistoryIndex(newIndex);
    setInputValue(commandHistory[newIndex]);
  };

  const handleHistoryDown = () => {
    if (historyIndex === -1) return;

    const newIndex = historyIndex + 1;
    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1);
      setInputValue('');
    } else {
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    }
  };

  // Respect reduced motion
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div
      className={cn(
        terminalVariants({ size: 'md' }),
        'terminal-container flex flex-col',
        className
      )}
    >
      {/* Scanline overlay effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
          backgroundSize: '100% 2px',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-void-light/50">
        <TerminalIcon size={14} className="text-spinoza-yellow" />
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          Terminal
        </span>
        <div className="flex-1" />
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-auto p-4 space-y-1"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        <AnimatePresence initial={!prefersReducedMotion}>
          {lines.map((line) => (
            <TerminalLineDisplay
              key={line.id}
              line={line}
              showTimestamp={showTimestamps}
              enableTypewriter={!prefersReducedMotion && line.type === 'output'}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Input area */}
      {!readOnly && (
        <div className="px-4 py-3 border-t border-white/5 bg-void-light/30">
          <TerminalInput
            prompt={prompt}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            onHistoryUp={handleHistoryUp}
            onHistoryDown={handleHistoryDown}
            disabled={isProcessing}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export { terminalVariants, lineTypeVariants };
