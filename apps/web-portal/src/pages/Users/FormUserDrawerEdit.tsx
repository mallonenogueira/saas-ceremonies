import { useToast } from "@chakra-ui/react";
import { api, fetcher } from "../../services/api";
import { FormUserDrawer } from "./FormUserDrawer";
import useSWR from "swr";
import { User } from "../../models/user";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";

export function FormUserDrawerEdit({
  onSuccess,
  onClose,
  id,
}: {
  onSuccess: () => void | Promise<void>;
  onClose: () => void;
  id?: string;
}) {
  const toast = useToast({
    duration: 5000,
    isClosable: true,
  });
  const { data } = useSWR<{ data: User[] }>(id && `/users?id=${id}`, {
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

  async function onSubmit(user: User) {
    try {
      await api.put("/users/" + user.id, user);

      onSuccess();

      toast({
        title: "Usuário editado com sucesso.",
        status: "success",
      });
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao editar usuário.",
        error,
        toast,
      });
    }
  }
  const user = data?.data[0];

  return (
    <FormUserDrawer
      title={user?.name || ""}
      initialValues={user}
      isOpen={!!user}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
