import { useToast } from "@chakra-ui/react";
import { Address } from "../../models/address";
import { api, fetcher } from "../../services/api";
import { FormAddressDrawer } from "./FormAddressDrawer";
import useSWR from "swr";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";

export function FormAddressDrawerEdit({
  onSuccess,
  onClose,
  id,
}: {
  onSuccess: () => void | Promise<void>;
  onClose: () => void;
  id?: string;
}) {
  const { data } = useSWR<{ data: Address[] }>(id && `/address?id=${id}`, {
    fetcher,
    onError: (error) => {
      apiErrorHandlerToast({
        title: "Erro ao buscar endereço.",
        error,
        toast,
      });
      onClose();
    },
  });
  const toast = useToast();

  async function onSubmit(values: Address) {
    try {
      await api.post("/address", values);

      onSuccess();

      toast({
        title: "Endereço editado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao editar endereço.",
        error,
        toast,
      });
    }
  }
  const address = data?.data[0];

  return (
    <FormAddressDrawer
      title={address?.name || ""}
      initialValues={address}
      isOpen={!!address}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
