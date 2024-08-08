import { Button, useDisclosure } from "@chakra-ui/react";
import { useAddress } from "../../services/address";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { FormAddressDrawerNew } from "./FormAddressDrawerNew";
import { PageHeader } from "../../components/Layout/PageHeader";
import { PageContainer } from "../../components/Layout/PageContainer";
import { FormAddressDrawerEdit } from "./FormAddressDrawerEdit";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable";
import { Address } from "../../models/address";
import { usePageParam } from "../../hooks/use-page-param";

function AddressPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const page = usePageParam();
  const [idEdit, setIdEdit] = useState("");
  const { data, isLoading, error, mutate } = useAddress(page.page, sorting);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const columnHelper = createColumnHelper<Address>();

  const columns = [
    columnHelper.accessor("name", { header: "Nome" }),
    columnHelper.accessor("address", { header: "Endereço" }),
    columnHelper.accessor("city", { header: "Cidade" }),
    columnHelper.accessor("state", { header: "Estado" }),
    columnHelper.accessor("state", { header: "Estado", enablePinning: true }),
  ];

  function onSuccess() {
    mutate();
    onClose();
  }

  function onSuccessEdit() {
    mutate();
    setIdEdit("");
  }

  if (isLoading || !data) return <div>carregando</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <PageHeader />

      <PageContainer
        currentPage="Endereços"
        action={
          <Button leftIcon={<PlusSquareIcon />} size="sm" onClick={onOpen}>
            Novo Endereço
          </Button>
        }
      >
        {data && (
          <DataTable
            {...data}
            onChangePage={page.setPage}
            data={data.data}
            columns={columns}
            sorting={sorting}
            onSortingChange={setSorting}
            onRowClick={(address) => setIdEdit(address.id)}
          />
        )}

        <FormAddressDrawerNew
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={onSuccess}
        />

        <FormAddressDrawerEdit
          id={idEdit}
          onClose={() => setIdEdit("")}
          onSuccess={onSuccessEdit}
        />
      </PageContainer>
    </>
  );
}

export default AddressPage;
