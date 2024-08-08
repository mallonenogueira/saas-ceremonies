import { useToast } from "@chakra-ui/react";
import { api } from "../../services/api";
import { FormUserDrawer } from "./FormUserDrawer";
import { User } from "../../models/user";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";

export function FormUserDrawerNew({
  onSuccess,
  isOpen,
  onClose,
}: {
  onSuccess: () => void | Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast();

  async function onSubmit(values: User) {
    try {
      await api.post("/users", values);

      toast({
        title: "Usuário cadastro com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      onSuccess();
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao cadastrar usuário.",
        error,
        toast,
      });
    }
  }

  return (
    <FormUserDrawer
      title="Novo usuário"
      initialValues={{}}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isRequiredPassword
    />
  );
}
