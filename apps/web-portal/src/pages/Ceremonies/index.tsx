import { Button, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { PageHeader } from "../../components/Layout/PageHeader";
import { PageContainer } from "../../components/Layout/PageContainer";
import { CeremonyDrawerNew } from "./CeremonyDrawerNew";
import { CeremonyDrawerEdit } from "./CeremonyDrawerEdit";
import {
  CellContext,
  createColumnHelper,
  RowData,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable";
import { usePageParam } from "../../hooks/use-page-param";
import { useCeremonies } from "../../services/ceremonies";
import { Ceremony } from "../../models/ceremony";
import { intlFormat } from "date-fns";

function datetimeCell<TData extends RowData, TValue = unknown>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue() as string;

  return (
    value &&
    intlFormat(value, {
      dateStyle: "short",
      timeStyle: "short",
    })
  );
}
function CeremoniesPage() {
  const page = usePageParam();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [idEdit, setIdEdit] = useState("");
  const { data, isLoading, error, mutate } = useCeremonies(page.page, sorting);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const columnHelper = createColumnHelper<Ceremony>();

  const columns = [
    columnHelper.accessor("peopleName", {
      header: "Nome",
    }),
    columnHelper.accessor("start", {
      header: "Início",
      cell: datetimeCell,
    }),
    columnHelper.accessor("end", { header: "Fim", cell: datetimeCell }),
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
        currentPage="Cerimônias"
        action={
          <Button leftIcon={<PlusSquareIcon />} size="sm" onClick={onOpen}>
            Nova cerimônia
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

        <CeremonyDrawerNew
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={onSuccess}
        />

        <CeremonyDrawerEdit
          id={idEdit}
          onClose={() => setIdEdit("")}
          onSuccess={onSuccessEdit}
        />
      </PageContainer>
    </>
  );
}

export default CeremoniesPage;
