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

export interface TableAddressProps {
  onChangePage: PaginationProps["onChangePage"];
  pagination: Omit<PaginationProps, "onChangePage">;
  data: Address[];
  onRowClick: (address: Address) => void;
}

export function TableAddress({
  onChangePage,
  pagination,
  data,
  onRowClick,
}: TableAddressProps) {
  return (
    <TableContainer border="1px solid" borderColor="gray.300" borderRadius="md">
      <Table variant="simple" size="custom">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Endereço</Th>
            <Th>Cidade</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map((address) => (
            <Tr key={address.id} onClick={() => onRowClick(address)}>
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
