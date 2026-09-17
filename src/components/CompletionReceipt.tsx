import { motion } from 'framer-motion';
import { CheckCircle2, Copy, RefreshCcw, Share2 } from 'lucide-react';
import type { SplitData } from '../App';
import { triggerVibration } from '../utils';

interface CompletionReceiptProps {
  totalAmount: number;
  merchantUpi: string;
  merchantName: string;
  splits: SplitData[];
  onReset: () => void;
}

export function CompletionReceipt({
  totalAmount,
  merchantUpi,
  merchantName,
  splits,
  onReset
}: CompletionReceiptProps) {
  const mdrSaved = (totalAmount * 0.004).toFixed(2);
  
  const receiptText = `
Payment Summary
Merchant: ${merchantName} (${merchantUpi})
Total Paid: ₹${totalAmount.toFixed(2)}
Splits: ${splits.length}
Saved Merchant MDR: ₹${mdrSaved}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptText);
    triggerVibration(50);
  };

  const handleShare = async () => {
    triggerVibration(50);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Merchant Mitra Payment Receipt',
          text: receiptText,
        });
      } catch (err) {
        // Fallback or ignore if user cancels
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="glass rounded-2xl p-5 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500" />
      
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-text-main mb-1">Payment Complete</h2>
        <p className="text-text-muted">All splits successfully processed</p>
      </div>

      <div className="bg-surface rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-white/5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-text-muted">Total Paid</span>
          <span className="text-2xl font-bold font-mono text-text-main">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Merchant</span>
            <span className="text-text-main font-medium">{merchantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">UPI ID</span>
            <span className="text-text-main font-mono text-xs sm:text-sm truncate ml-2">{merchantUpi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Transactions</span>
            <span className="text-text-main">{splits.length} splits</span>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-3 text-center mt-4">
          <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">
            Total Merchant MDR saved: ₹{mdrSaved}
          </span>
        </div>
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={canShare ? handleShare : handleCopy}
          className="flex-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-text-main py-4 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors min-h-[48px]"
        >
          {canShare ? <Share2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {canShare ? 'Share Summary' : 'Copy Summary'}
        </button>
        <button
          onClick={onReset}
          className="bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-text-main py-4 sm:py-3 px-4 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="New Payment"
        >
          <RefreshCcw className="w-5 h-5" />
          <span className="sm:hidden ml-2 font-medium">New Payment</span>
        </button>
      </div>
    </div>
  );
}
