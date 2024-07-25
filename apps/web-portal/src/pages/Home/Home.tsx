import { Button, useDisclosure } from "@chakra-ui/react";
import { useAddress } from "../../services/address";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { FormAddressDrawerNew } from "./FormAddressDrawerNew";
import { TableAddress } from "./TableAddress";
import { PageHeader } from "../../components/Layout/PageHeader";
import { PageContainer } from "../../components/Layout/PageContainer";
import { FormAddressDrawerEdit } from "./FormAddressDrawerEdit";
interface OrderBy {
  field: string;
  order: "asc" | "desc";
}

function Home() {
  const [order, setOrder] = useState<OrderBy>({
    field: "name",
    order: "asc",
  });
  const [idEdit, setIdEdit] = useState("");
  const [page, setPage] = useState(0);
  const { data, isLoading, error, mutate } = useAddress(page, order);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
        action={
          <Button leftIcon={<PlusSquareIcon />} size="sm" onClick={onOpen}>
            Novo Endereço
          </Button>
        }
      >
        {data && (
          <TableAddress
            {...data}
            order={order}
            onOrder={setOrder}
            onChangePage={setPage}
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
          onClose={() => {
            setIdEdit("");
          }}
          onSuccess={onSuccessEdit}
        />
      </PageContainer>
    </>
  );
}

export default Home;
