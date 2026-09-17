
import type { SplitData } from '../App';
import { SplitCard } from './SplitCard';

interface TransactionStackProps {
  splits: SplitData[];
  completedSplits: Set<string>;
  merchantUpi: string;
  merchantName: string;
  onComplete: (id: string) => void;
}

export function TransactionStack({
  splits,
  completedSplits,
  merchantUpi,
  merchantName,
  onComplete
}: TransactionStackProps) {
  return (
    <div className="flex flex-col gap-4">
      {splits.map((split, index) => {
        const isCompleted = completedSplits.has(split.id);
        const isLocked = index > 0 && !completedSplits.has(splits[index - 1].id);
        
        return (
          <SplitCard
            key={split.id}
            index={index}
            totalSplits={splits.length}
            split={split}
            isCompleted={isCompleted}
            isLocked={isLocked}
            merchantUpi={merchantUpi}
            merchantName={merchantName}
            onComplete={() => onComplete(split.id)}
          />
        );
      })}
    </div>
  );
}
