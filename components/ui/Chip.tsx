import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ icon, label, value, className }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-100",
        className
      )}
    >
      <div className="text-violet-900">
        {icon}
      </div>
      <span className="text-violet-900 font-medium text-sm">
        {label}: {value}
      </span>
    </div>
  );
};

export default Chip;
