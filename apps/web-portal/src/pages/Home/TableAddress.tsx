import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Pagination, PaginationProps } from "../../components/Pagination";
import { Address } from "../../models/address";
import { ReactNode } from "react";

interface OrderBy {
  field: string;
  order: "asc" | "desc";
}

export interface TableAddressProps {
  onChangePage: PaginationProps["onChangePage"];
  pagination: Omit<PaginationProps, "onChangePage">;
  data: Address[];
  onRowClick: (address: Address) => void;
  onOrder?: (order: OrderBy) => void;
  order?: OrderBy;
}

function ThCustom({
  name,
  children,
  order,
  onOrder,
}: {
  text?: string;
  name?: string;
  children: ReactNode;
  onOrder?: (order: OrderBy) => void;
  order?: OrderBy;
}) {
  const showDirection = order?.field === name;
  const isAsc = showDirection && order?.order === "asc";

  function handleClickOrder() {
    if (!onOrder || !name) return;

    onOrder({
      field: name,
      order: isAsc ? "desc" : "asc",
    });
  }
  return (
    <Th
      onClick={handleClickOrder}
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.300",
      }}
    >
      {children} {showDirection && (isAsc ? "\\/" : "/\\")}
    </Th>
  );
}

export function TableAddress({
  onChangePage,
  pagination,
  data,
  onRowClick,
  order,
  onOrder,
}: TableAddressProps) {
  return (
    <TableContainer border="1px solid" borderColor="gray.300" borderRadius="md">
      <Table variant="simple" size="custom">
        <Thead>
          <Tr>
            <ThCustom order={order} onOrder={onOrder} name="name">
              Nome
            </ThCustom>
            <ThCustom order={order} onOrder={onOrder} name="address">
              Endereço
            </ThCustom>
            <ThCustom order={order} onOrder={onOrder} name="city">
              Cidade
            </ThCustom>
            <ThCustom order={order} onOrder={onOrder} name="state">
              Estado
            </ThCustom>
          </Tr>
        </Thead>

        <Tbody>
          {data.map((address) => (
            <Tr
              onClick={() => onRowClick(address)}
              cursor="pointer"
              _hover={{
                backgroundColor: "gray.300",
              }}
              key={address.id}
            >
              <Td>{address.name}</Td>
              <Td>{address.address}</Td>
              <Td>{address.city}</Td>
              <Td>{address.state}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination {...pagination} onChangePage={onChangePage} />
    </TableContainer>
  );
}
