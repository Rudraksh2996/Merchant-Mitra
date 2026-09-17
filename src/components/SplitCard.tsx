import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Lock, QrCode, ExternalLink, Copy } from 'lucide-react';
import type { SplitData } from '../App';
import { cn, triggerVibration } from '../utils';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { BottomSheet } from './BottomSheet';

interface SplitCardProps {
  index: number;
  totalSplits: number;
  split: SplitData;
  isCompleted: boolean;
  isLocked: boolean;
  merchantUpi: string;
  merchantName: string;
  onComplete: () => void;
}

export function SplitCard({
  index,
  totalSplits,
  split,
  isCompleted,
  isLocked,
  merchantUpi,
  merchantName,
  onComplete
}: SplitCardProps) {
  const [showQR, setShowQR] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const upiUrl = `upi://pay?pa=${merchantUpi}&pn=${encodeURIComponent(merchantName)}&am=${split.amount}&cu=INR&tn=${encodeURIComponent(`Split Payment ${index + 1}`)}`;

  const handleComplete = () => {
    triggerVibration(50);
    onComplete();
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(merchantUpi);
    triggerVibration(50);
  };

  const ActionsContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <a
          href={upiUrl}
          className="flex-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-text-main py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors min-h-[48px]"
        >
          <ExternalLink className="w-5 h-5" />
          Pay via UPI App
        </a>
        {!isMobile && (
          <button
            onClick={() => setShowQR(!showQR)}
            className="bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-text-main p-3 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Show QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>
        )}
      </div>

      <button
        onClick={copyUpiId}
        className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-text-muted hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors flex justify-center items-center gap-2 min-h-[48px]"
      >
        <Copy className="w-4 h-4" />
        Copy Merchant UPI ID
      </button>

      <AnimatePresence>
        {(!isMobile && showQR) || (isMobile) ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-center bg-white p-4 rounded-xl mt-2"
          >
            <QRCodeSVG value={upiUrl} size={isMobile ? 220 : 160} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        onClick={() => {
          if (isMobile) setIsSheetOpen(false);
          handleComplete();
        }}
        className="w-full mt-2 py-3 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 font-bold transition-colors min-h-[48px]"
      >
        Mark Payment as Complete
      </button>
    </div>
  );

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {
          if (isMobile && !isCompleted && !isLocked) {
            triggerVibration(20);
            setIsSheetOpen(true);
          }
        }}
        className={cn(
          "glass rounded-2xl border transition-all duration-300 overflow-hidden",
          isCompleted ? "border-emerald-500/30 bg-emerald-500/5" : 
          isLocked ? "border-slate-200 dark:border-white/5 opacity-50 grayscale" : "border-cyan-500/30 bg-cyan-500/5 cursor-pointer sm:cursor-default"
        )}
      >
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-text-muted">
                Payment {index + 1} of {totalSplits}
              </h3>
              <p className="text-2xl font-bold font-mono text-text-main mt-1">
                ₹{split.amount.toFixed(2)}
              </p>
            </div>
            
            <div>
              {isCompleted ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </div>
              ) : isLocked ? (
                <div className="flex items-center gap-2 text-text-muted bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Locked
                </div>
              ) : (
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-full text-sm font-medium animate-pulse">
                  Active
                </div>
              )}
            </div>
          </div>

          {!isMobile && !isCompleted && !isLocked && (
            <div className="mt-2">
              <ActionsContent />
            </div>
          )}
          
          {isMobile && !isCompleted && !isLocked && (
            <div className="text-center text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-2 py-2">
              Tap to Pay
            </div>
          )}
        </div>
      </motion.div>

      {isMobile && (
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title={`Payment ${index + 1}`}
        >
          <ActionsContent />
        </BottomSheet>
      )}
    </>
  );
}
