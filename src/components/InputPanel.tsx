import { useState, type FormEvent } from 'react';
import { IndianRupee, User, Store } from 'lucide-react';
import { cn } from '../utils';

interface InputPanelProps {
  onSplit: (amount: number, upi: string, name: string) => void;
}

export function InputPanel({ onSplit }: InputPanelProps) {
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount greater than 0';
    }
    
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upi || !upiRegex.test(upi)) {
      newErrors.upi = 'Enter a valid UPI ID (e.g., store@upi)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSplit(Number(amount), upi, name);
    }
  };

  const mdrSaved = (Number(amount || 0) * 0.004).toFixed(2);

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 sm:p-8 flex flex-col gap-5 sm:gap-6">
      
      {/* MDR Savings Highlight */}
      {Number(amount) > 2000 && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <p className="text-emerald-400 font-medium">
            You will save the merchant <span className="text-emerald-300 font-bold font-mono">₹{mdrSaved}</span> in MDR fees!
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">Total Amount</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-5 w-5 text-text-muted group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={cn(
                "block w-full pl-10 pr-3 py-3 bg-surface border rounded-xl text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-lg min-h-[48px]",
                errors.amount ? "border-red-500/50" : "border-slate-200 dark:border-white/10"
              )}
              placeholder="0.00"
            />
          </div>
          {errors.amount && <p className="text-red-400 text-sm">{errors.amount}</p>}
        </div>

        {/* UPI Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">Merchant UPI ID</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Store className="h-5 w-5 text-text-muted group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="text"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              className={cn(
                "block w-full pl-10 pr-3 py-3 bg-surface border rounded-xl text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono min-h-[48px]",
                errors.upi ? "border-red-500/50" : "border-slate-200 dark:border-white/10"
              )}
              placeholder="store@bank"
            />
          </div>
          {errors.upi && <p className="text-red-400 text-sm">{errors.upi}</p>}
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">Merchant Name (Optional)</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-text-muted group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-surface border border-slate-200 dark:border-white/10 rounded-xl text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[48px]"
              placeholder="Store Name"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all active:scale-[0.98] min-h-[56px]"
      >
        Split & Pay
      </button>
    </form>
  );
}
