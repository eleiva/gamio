import React from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollectButtonProps {
  isCollected: boolean;
  onClick: () => void;
  className?: string;
  isUpdating?: boolean;
}

const CollectButton: React.FC<CollectButtonProps> = ({ 
  isCollected, 
  onClick, 
  className,
  isUpdating = false
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isUpdating}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 w-full md:w-auto md:min-w-[140px]",
        isUpdating 
          ? "bg-gray-500 text-white cursor-not-allowed opacity-75" 
          : isCollected 
            ? "bg-white text-violet-600 border border-violet-200 hover:bg-violet-50 hover:text-violet-700" 
            : "bg-violet-900 text-white hover:bg-violet-800",
        className
      )}
      aria-label={isCollected ? "Remove from collection" : "Add to collection"}
    >
      {isUpdating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart 
          className={cn(
            "h-4 w-4", 
            isCollected && "fill-current"
          )} 
        />
      )}
      {isUpdating ? 'Updating...' : (isCollected ? 'Game collected' : 'Collect game')}
    </button>
  );
};

export default CollectButton;
