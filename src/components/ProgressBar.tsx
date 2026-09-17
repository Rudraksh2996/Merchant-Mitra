
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="glass rounded-xl p-3 sm:p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-text-muted">
          {current} of {total} Completed
        </span>
        <span className="text-cyan-400">{percentage}%</span>
      </div>
      
      <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-white/5 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-cyan-400 blur-sm mix-blend-screen"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          style={{ opacity: 0.5 }}
        />
      </div>
    </div>
  );
}
