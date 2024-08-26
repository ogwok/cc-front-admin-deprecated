
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { FaFilter, FaSort, FaSortUp, FaSortDown, FaSearch, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { TextInput, Spinner } from 'flowbite-react';
    
    interface Column {
      key: string;
      header: string;
    }
    
    interface SharedTableProps {
      items: any[];
      columns: Column[];
      EditModal?: React.ComponentType<{ item: any; onEdit: (id: string, data: any) => void }>;
      DeleteModal?: React.ComponentType<{ itemId: string; onDelete: (id: string) => void }>;
      onEdit?: (id: string, data: any) => void;
      onDelete?: (id: string) => void;
      isLoading?: boolean;
    }
    
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
      const itemRank = rankItem(row.getValue(columnId), value);
      addMeta({ itemRank });
      return itemRank.passed;
    };
    
    const SharedTable: React.FC<SharedTableProps> = ({
      items,
      columns,
      EditModal,
      DeleteModal,
      onEdit,
      onDelete,
      isLoading = false,
    }) => {
      const [columnFilters, setColumnFilters] = useState<{ id: string; value: string }[]>([]);
      const [globalFilter, setGlobalFilter] = useState('');
      const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
    
      const tableColumns: ColumnDef<any>[] = React.useMemo(
        () => [
          ...columns.map((column) => ({
            accessorKey: column.key,
            header: column.header,
            cell: (info) => info.getValue(),
          })),
          ...(EditModal || DeleteModal
            ? [
                {
                  id: 'actions',
                  header: 'Actions',
                  cell: ({ row }) => (
                    <div className="flex items-center gap-x-3">
                      {EditModal && onEdit && (
                        <EditModal item={row.original} onEdit={onEdit} />
                      )}
                      {DeleteModal && onDelete && (
                        <DeleteModal itemId={row.original.id} onDelete={onDelete} />
                      )}
                    </div>
                  ),
                },
              ]
            : []),
        ],
        [columns, EditModal, DeleteModal, onEdit, onDelete]
      );
    
      const table = useReactTable({
        data: items,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
          columnFilters,
          globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
          fuzzy: fuzzyFilter,
        },
        globalFilterFn: fuzzyFilter,
      });
    
      const toggleFilter = (columnId: string) => {
        setActiveFilters(prev => ({ ...prev, [columnId]: !prev[columnId] }));
      };
    
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <Spinner size="xl" />
          </div>
        );
      }
    
      if (items.length === 0) {
        return <div className="text-center py-8 text-gray-500 bg-white dark:bg-gray-800 rounded-lg shadow">No items to display</div>;
      }
    
      return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={globalFilter || ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder="Search all columns..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 font-medium"
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center justify-between">
                          {header.column.getCanSort() ? (
                            <button
                              className={`flex items-center ${
                                header.column.getIsSorted() ? 'text-blue-600' : ''
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <span className="ml-1">
                                {{
                                  asc: <FaSortUp />,
                                  desc: <FaSortDown />,
                                }[header.column.getIsSorted() as string] ?? <FaSort />}
                              </span>
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                          {header.column.getCanFilter() && (
                            <div className="relative ml-2">
                              <button
                                onClick={() => toggleFilter(header.id)}
                                className={`p-1 rounded-md ${
                                  activeFilters[header.id] ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                }`}
                              >
                                <FaFilter className="w-3 h-3" />
                              </button>
                              {activeFilters[header.id] && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2">
                                  <TextInput
                                    type="text"
                                    value={(header.column.getFilterValue() as string) ?? ''}
                                    onChange={e => header.column.setFilterValue(e.target.value)}
                                    placeholder={`Filter ${header.column.columnDef.header?.toString()}`}
                                    className="w-full text-sm"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <button
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <FaAngleDoubleLeft className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-400">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <FaAngleDoubleRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-400">Go to page:</span>
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Total items: {table.getPrePaginationRowModel().rows.length}
              </span>
            </div>
          </div>
        </div>
      );
    };
    
    export default SharedTable;
    
    