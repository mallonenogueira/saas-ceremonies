import { useToast } from "@chakra-ui/react";
import { Address } from "../../models/address";
import { api } from "../../services/api";
import { FormAddressDrawer } from "./FormAddressDrawer";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";

export function FormAddressDrawerNew({
  onSuccess,
  isOpen,
  onClose,
}: {
  onSuccess: () => void | Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast();

  async function onSubmit(values: Address) {
    try {
      await api.post("/address", values);

      onSuccess();

      toast({
        title: "Endereço cadastro com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao cadastrar endereço.",
        error,
        toast,
      });
    }
  }

  return (
    <FormAddressDrawer
      title="Novo endereço"
      initialValues={{
        zipCode: "",
        address: "",
        city: "",
        state: "",
        complement: "",
        name: "",
        id: "",
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
