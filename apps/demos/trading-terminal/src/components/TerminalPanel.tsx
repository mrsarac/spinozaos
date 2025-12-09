'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import { terminalCommands, predictionMarkets } from '@/lib/data';

interface CommandOutput {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

export function TerminalPanel() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { id: '0', type: 'output', content: 'SpinozaOS Trading Terminal v1.0.0' },
    { id: '1', type: 'output', content: 'Connected to AGI Prediction Markets' },
    { id: '2', type: 'output', content: 'Type "help" for available commands.' },
    { id: '3', type: 'output', content: '' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let output: CommandOutput[] = [];

    switch (command) {
      case 'help':
        output = terminalCommands.map((c, i) => ({
          id: `${Date.now()}-${i}`,
          type: 'output' as const,
          content: `  ${c.command.padEnd(25)} ${c.description}`,
        }));
        output.unshift({ id: `${Date.now()}-header`, type: 'output', content: 'Available commands:' });
        break;

      case 'markets':
        output = predictionMarkets.map((m, i) => ({
          id: `${Date.now()}-${i}`,
          type: 'output' as const,
          content: `  ${m.symbol.padEnd(10)} ${m.currentPrice.toFixed(1).padStart(5)}%  ${m.name}`,
        }));
        output.unshift({ id: `${Date.now()}-header`, type: 'output', content: 'Active Markets:' });
        break;

      case 'price':
        if (args.length === 0) {
          output = [{ id: Date.now().toString(), type: 'error', content: 'Usage: price <symbol>' }];
        } else {
          const market = predictionMarkets.find((m) => m.symbol.toLowerCase() === args[0]);
          if (market) {
            const change = market.currentPrice - market.previousPrice;
            output = [
              { id: `${Date.now()}-1`, type: 'success', content: `${market.symbol}: ${market.currentPrice.toFixed(2)}%` },
              { id: `${Date.now()}-2`, type: 'output', content: `  24h Change: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%` },
              { id: `${Date.now()}-3`, type: 'output', content: `  Volume: $${(market.volume24h / 1000000).toFixed(2)}M` },
            ];
          } else {
            output = [{ id: Date.now().toString(), type: 'error', content: `Market not found: ${args[0]}` }];
          }
        }
        break;

      case 'buy':
      case 'sell':
        if (args.length < 2) {
          output = [{ id: Date.now().toString(), type: 'error', content: `Usage: ${command} <symbol> <amount>` }];
        } else {
          const market = predictionMarkets.find((m) => m.symbol.toLowerCase() === args[0]);
          if (market) {
            output = [
              { id: `${Date.now()}-1`, type: 'success', content: `Order placed: ${command.toUpperCase()} ${args[1]} ${market.symbol} @ ${market.currentPrice.toFixed(2)}%` },
              { id: `${Date.now()}-2`, type: 'output', content: `  Estimated value: $${(parseFloat(args[1]) * market.currentPrice).toFixed(2)}` },
            ];
          } else {
            output = [{ id: Date.now().toString(), type: 'error', content: `Market not found: ${args[0]}` }];
          }
        }
        break;

      case 'portfolio':
        output = [
          { id: `${Date.now()}-1`, type: 'output', content: 'Your Positions:' },
          { id: `${Date.now()}-2`, type: 'output', content: '  AGI27    500 contracts    +12.3%    $5,420' },
          { id: `${Date.now()}-3`, type: 'output', content: '  G5PHD    250 contracts    -3.2%     $2,180' },
          { id: `${Date.now()}-4`, type: 'output', content: '  ROBOT    100 contracts    +8.7%     $1,340' },
          { id: `${Date.now()}-5`, type: 'output', content: '' },
          { id: `${Date.now()}-6`, type: 'success', content: '  Total P&L: +$1,247.50 (+15.8%)' },
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = [{ id: Date.now().toString(), type: 'error', content: `Unknown command: ${command}. Type "help" for available commands.` }];
    }

    setHistory((prev) => [
      ...prev,
      { id: `input-${Date.now()}`, type: 'input', content: cmd },
      ...output,
      { id: `spacer-${Date.now()}`, type: 'output', content: '' },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-void rounded-lg border border-white/5 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-void-light/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Terminal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Output area */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-3 font-mono text-[11px]">
        {history.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              ${line.type === 'input' ? 'text-spinoza-yellow' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'success' ? 'text-green-400' : ''}
              ${line.type === 'output' ? 'text-neutral-400' : ''}
              leading-relaxed whitespace-pre
            `}
          >
            {line.type === 'input' && <span className="text-cyan-400">❯ </span>}
            {line.content}
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/5">
        <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[11px] text-white outline-none placeholder-neutral-600"
          placeholder="Enter command..."
          autoFocus
        />
        <span className="w-2 h-4 bg-spinoza-yellow cursor-blink" />
      </form>
    </div>
  );
}
