import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div' | 'span' | 'p';
}

const Typography: React.FC<TypographyProps> = ({ 
  variant, 
  children, 
  className, 
  as 
}) => {
  const Component = as || variant;
  
  const variantClasses = {
    h1: 'typography-h1',
    h2: 'typography-h2', 
    h3: 'typography-h3',
    h4: 'typography-h4',
    h5: 'typography-h5'
  };

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};

export default Typography;
