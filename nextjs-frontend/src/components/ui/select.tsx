import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, onValueChange, onChange, ...props }, ref) => {
    const classes = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(e.target.value);
    };
    
    return (
      <select className={classes} ref={ref} onChange={handleChange} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <option className={className} ref={ref} {...props}>
        {children}
      </option>
    );
  }
);

SelectItem.displayName = 'SelectItem';

// Additional components for more complex select usage
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => {
  const classes = `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
  
  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ className = '', children, ...props }, ref) => {
  const classes = `relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md ${className}`;
  
  return (
    <div className={classes} ref={ref} {...props}>
      {children}
    </div>
  );
});

SelectContent.displayName = 'SelectContent';

export const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className = '', placeholder, ...props }, ref) => {
  return (
    <span className={className} ref={ref} {...props}>
      {placeholder}
    </span>
  );
});

SelectValue.displayName = 'SelectValue';
