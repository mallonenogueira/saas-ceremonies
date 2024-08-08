import { useToast } from "@chakra-ui/react";
import { api, fetcher } from "../../services/api";
import { CeremonyDrawer } from "./CeremonyDrawer";
import useSWR from "swr";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";
import { Ceremony } from "../../models/ceremony";
import { formatDate } from "../../utils/format-to-back";

export function CeremonyDrawerEdit({
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

  const { data } = useSWR<{ data: Ceremony[] }>(id && `/ceremonies?id=${id}`, {
    fetcher,
    onError: (error) => {
      apiErrorHandlerToast({
        title: "Erro ao buscar cerimônia.",
        error,
        toast,
      });
      onClose();
    },
  });

  const ceremony = data?.data[0];

  async function onSubmit(values: Ceremony) {
    try {
      await api.put(`/ceremonies/${ceremony?.id}`, {
        ...values,
        start: formatDate(values.start) ?? undefined,
        end: formatDate(values.end) ?? undefined,
        peopleBirthDate: formatDate(values.peopleBirthDate) ?? undefined,
        peopleDeathDate: formatDate(values.peopleDeathDate) ?? undefined,
      });

      toast({
        title: "Cerimônia editar com sucesso.",
        status: "success",
      });

      onSuccess();
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao editar cerimônia.",
        error,
        toast,
      });
    }
  }

  return (
    <CeremonyDrawer
      title={ceremony?.peopleName || ""}
      initialValues={ceremony}
      isOpen={!!ceremony}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
