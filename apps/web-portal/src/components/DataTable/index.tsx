import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableContainer,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  OnChangeFn,
} from "@tanstack/react-table";
import { Pagination, PaginationProps } from "../Pagination";

export type DataTableProps<Data extends object> = {
  data: Data[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<Data, any>[];
  onRowClick?: (data: Data) => void;
  onSortingChange: OnChangeFn<SortingState>;
  sorting: SortingState;
  onChangePage?: PaginationProps["onChangePage"];
  pagination?: Omit<PaginationProps, "onChangePage">;
};

export function DataTable<Data extends object>({
  data,
  columns,
  sorting,
  onSortingChange,
  pagination,
  onChangePage,
  onRowClick,
}: DataTableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <TableContainer border="1px solid" borderColor="gray.300" borderRadius="md">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;

                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    cursor="pointer"
                    _hover={{
                      backgroundColor: "gray.300",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              {...(onRowClick && {
                cursor: "pointer",
                _hover: {
                  backgroundColor: "gray.300",
                },
              })}
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta;

                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {pagination && onChangePage && (
        <Pagination {...pagination} onChangePage={onChangePage} />
      )}
    </TableContainer>
  );
}
