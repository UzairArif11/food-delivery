import React from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `w-full caption-bottom text-sm ${className}`;
    
    return (
      <div className="relative w-full overflow-auto">
        <table className={classes} ref={ref} {...props}>
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `[&_tr]:border-b ${className}`;
    
    return (
      <thead className={classes} ref={ref} {...props}>
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `[&_tr:last-child]:border-0 ${className}`;
    
    return (
      <tbody className={classes} ref={ref} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`;
    
    return (
      <tr className={classes} ref={ref} {...props}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`;
    
    return (
      <th className={classes} ref={ref} {...props}>
        {children}
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`;
    
    return (
      <td className={classes} ref={ref} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = `mt-4 text-sm text-muted-foreground ${className}`;
    
    return (
      <caption className={classes} ref={ref} {...props}>
        {children}
      </caption>
    );
  }
);

TableCaption.displayName = 'TableCaption';
