import React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  header: React.ReactNode;
  accessorKey: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  isHoverable?: boolean;
  isStriped?: boolean;
  maxHeight?: string | number;
  className?: string;
}

interface SortHeaderProps<T> {
  column: Column<T>;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
}

const SortHeader = <T,>({ column, sortColumn, sortDirection, onSort }: SortHeaderProps<T>) => {
  const isSorted = sortColumn === column.accessorKey;
  
  const handleClick = () => {
    if (!onSort || !column.sortable) return;
    
    const newDirection = !isSorted 
      ? 'asc'
      : sortDirection === 'asc' 
        ? 'desc' 
        : 'asc';
        
    onSort(column.accessorKey, newDirection);
  };

  return (
    <div
      className={`flex items-center gap-2 ${column.sortable ? 'cursor-pointer select-none' : ''}`}
      onClick={handleClick}
    >
      <span>{column.header}</span>
      {column.sortable && (
        <span className="text-gray-400">
          {isSorted ? (
            sortDirection === 'asc' ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )
          ) : (
            <ChevronsUpDown className="w-4 h-4" />
          )}
        </span>
      )}
    </div>
  );
};

function Table<T>({
  data,
  columns,
  isLoading = false,
  onSort,
  sortColumn,
  sortDirection,
  onRowClick,
  emptyMessage = "Aucune donnée disponible",
  isHoverable = true,
  isStriped = true,
  maxHeight,
  className = ''
}: TableProps<T>) {
  // Container styles
  const containerStyles = `
    relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700
    ${className}
  `;

  // Table styles
  const tableStyles = `
    w-full divide-y divide-gray-200 dark:divide-gray-700
    ${maxHeight ? 'overflow-auto' : ''}
  `;

  // Header styles
  const headerStyles = `
    bg-gray-50 dark:bg-gray-800
    text-xs font-medium text-gray-500 dark:text-gray-400
    uppercase tracking-wider
  `;

  // Row styles
  const getRowStyles = (index: number) => `
    ${onRowClick ? 'cursor-pointer' : ''}
    ${isHoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
    ${isStriped && index % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}
    transition-colors
  `;

  // Loading overlay
  if (isLoading) {
    return (
      <div className={containerStyles}>
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Chargement...</div>
        </div>
        <table className={tableStyles}>
          <thead className={headerStyles}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-${column.align || 'left'}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(3)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <div className={containerStyles}>
        <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <div className={maxHeight ? `overflow-auto max-h-[${maxHeight}]` : ''}>
        <table className={tableStyles}>
          <thead className={headerStyles}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-${column.align || 'left'}`}
                >
                  {column.sortable ? (
                    <SortHeader
                      column={column}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={onSort}
                    />
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={getRowStyles(rowIndex)}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column.accessorKey];
                  return (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-${column.align || 'left'}`}
                    >
                      {column.cell ? column.cell(value, row) : (value as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

// Usage example:
/*
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: Column<User>[] = [
  {
    header: 'Nom',
    accessorKey: 'name',
    sortable: true,
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Rôle',
    accessorKey: 'role',
    cell: (value) => value.toUpperCase(),
  },
  {
    header: 'Statut',
    accessorKey: 'status',
    align: 'center',
    cell: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    ),
  },
];

const MyComponent = () => {
  const [sortColumn, setSortColumn] = useState<keyof User>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>();

  const handleSort = (column: keyof User, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <Table
      data={users}
      columns={columns}
      onSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      isHoverable
      isStriped
    />
  );
};
*/