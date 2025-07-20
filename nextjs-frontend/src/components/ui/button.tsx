import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    };
    
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      default: 'h-10 py-2 px-4',
      lg: 'h-12 px-8'
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
