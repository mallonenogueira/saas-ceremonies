import { useToast } from "@chakra-ui/react";
import { Address } from "../../models/address";
import { api } from "../../services/api";
import { FormAddressDrawer } from "./FormAddressDrawer";

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
    await api.post("/address", values);

    onSuccess();

    toast({
      title: "Endereço cadastro com sucesso.",
      description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <FormAddressDrawer
      title="Novo endereço"
      initialValues={{
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
