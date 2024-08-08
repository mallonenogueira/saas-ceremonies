import { Button, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { FormUserDrawerNew } from "./FormUserDrawerNew";
import { PageHeader } from "../../components/Layout/PageHeader";
import { PageContainer } from "../../components/Layout/PageContainer";
import { FormUserDrawerEdit } from "./FormUserDrawerEdit";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable";
import { useUsers } from "../../services/users";
import { User } from "../../models/user";
import { usePageParam } from "../../hooks/use-page-param";

function UserPage() {
  const page = usePageParam();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [idEdit, setIdEdit] = useState("");
  const { data, isLoading, error, mutate } = useUsers(page.page, sorting);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("name", { header: "Nome" }),
    columnHelper.accessor("email", { header: "Email" }),
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
        currentPage="Usuários"
        action={
          <Button leftIcon={<PlusSquareIcon />} size="sm" onClick={onOpen}>
            Novo Usuário
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
            onRowClick={(row) => setIdEdit(row.id)}
          />
        )}

        <FormUserDrawerNew
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={onSuccess}
        />

        <FormUserDrawerEdit
          id={idEdit}
          onClose={() => setIdEdit("")}
          onSuccess={onSuccessEdit}
        />
      </PageContainer>
    </>
  );
}

export default UserPage;
