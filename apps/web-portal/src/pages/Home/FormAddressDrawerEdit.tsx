import { useToast } from "@chakra-ui/react";
import { Address } from "../../models/address";
import { api, fetcher } from "../../services/api";
import { FormAddressDrawer } from "./FormAddressDrawer";
import useSWR from "swr";

export function FormAddressDrawerEdit({
  onSuccess,
  onClose,
  id,
}: {
  onSuccess: () => void | Promise<void>;
  onClose: () => void;
  id?: string;
}) {
  const { data } = useSWR<{ data: Address[] }>(
    id && `/address?id=${id}`,
    fetcher
  );
  const toast = useToast();

  async function onSubmit(values: Address) {
    await api.post("/address", values);

    onSuccess();

    toast({
      title: "Endereço editado com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
  const address = data?.data[0];

  return (
    <FormAddressDrawer
      title={address?.name || ''}
      initialValues={address}
      isOpen={!!address}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
