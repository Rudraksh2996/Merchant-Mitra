import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { TransactionStack } from './components/TransactionStack';
import { CompletionReceipt } from './components/CompletionReceipt';
import { ProgressBar } from './components/ProgressBar';
import confetti from 'canvas-confetti';

export interface SplitData {
  amount: number;
  id: string;
}

function App() {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [merchantUpi, setMerchantUpi] = useState<string>('');
  const [merchantName, setMerchantName] = useState<string>('');
  const [splits, setSplits] = useState<SplitData[]>([]);
  const [completedSplits, setCompletedSplits] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
      if (systemPrefersDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      if (nextTheme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return nextTheme;
    });
  };

  const handleSplit = (amount: number, upi: string, name: string) => {
    setTotalAmount(amount);
    setMerchantUpi(upi);
    setMerchantName(name || 'Merchant');

    const MAX_SPLIT = 1998;
    const numSplits = Math.floor(amount / MAX_SPLIT);
    const remainder = amount % MAX_SPLIT;
    
    const newSplits: SplitData[] = [];
    for (let i = 0; i < numSplits; i++) {
      newSplits.push({ amount: MAX_SPLIT, id: `split-${i}` });
    }
    if (remainder > 0) {
      newSplits.push({ amount: remainder, id: `split-${numSplits}` });
    }
    
    setSplits(newSplits);
    setCompletedSplits(new Set());
  };

  const handleCompleteSplit = (id: string) => {
    setCompletedSplits(prev => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === splits.length) {
        triggerConfetti();
      }
      return next;
    });
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleReset = () => {
    setTotalAmount(null);
    setMerchantUpi('');
    setMerchantName('');
    setSplits([]);
    setCompletedSplits(new Set());
  };

  const isComplete = splits.length > 0 && completedSplits.size === splits.length;

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-3 rounded-full glass hover:bg-white/10 transition-colors z-20"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-slate-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <main className="w-full max-w-xl z-10 flex flex-col gap-6">
        <header className="text-center mb-4 sm:mb-6 mt-12 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Merchant Mitra
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Bypass the 0.4% MDR fee on large transactions.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {splits.length === 0 ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <InputPanel onSplit={handleSplit} />
            </motion.div>
          ) : isComplete ? (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CompletionReceipt
                totalAmount={totalAmount!}
                merchantUpi={merchantUpi}
                merchantName={merchantName}
                splits={splits}
                onReset={handleReset}
              />
            </motion.div>
          ) : (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <ProgressBar current={completedSplits.size} total={splits.length} />
              <TransactionStack
                splits={splits}
                completedSplits={completedSplits}
                merchantUpi={merchantUpi}
                merchantName={merchantName}
                onComplete={handleCompleteSplit}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-8 flex flex-col gap-4">
          <div className="glass rounded-full px-4 py-2 text-xs text-text-muted text-center max-w-fit mx-auto">
            Bypassing ₹2,000 threshold to keep merchant fees at 0%. Compliant with NPCI P2M tier rules.
          </div>
        </footer>
      </main>
      
      <footer className="w-full mt-auto text-xs opacity-60 text-center py-6 px-4 border-t border-slate-200 dark:border-white/5 text-text-main z-10">
        Disclaimer: This is just a concept website and is not associated with the Indian Government, RBI, or any payment authorities.
      </footer>
    </div>
  );
}

export default App;
