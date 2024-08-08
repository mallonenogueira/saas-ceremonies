import { useToast } from "@chakra-ui/react";
import { api } from "../../services/api";
import { CeremonyDrawer } from "./CeremonyDrawer";
import { apiErrorHandlerToast } from "../../handlers/api-error-handler-toast";
import { Ceremony } from "../../models/ceremony";
import { formatDate } from "../../utils/format-to-back";

export function CeremonyDrawerNew({
  onSuccess,
  isOpen,
  onClose,
}: {
  onSuccess: () => void | Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast();

  async function onSubmit(values: Ceremony) {
    try {
      await api.post("/ceremonies", {
        ...values,
        start: formatDate(values.start),
        end: formatDate(values.end),
        peopleBirthDate: formatDate(values.peopleBirthDate),
        peopleDeathDate: formatDate(values.peopleDeathDate),
      });

      toast({
        title: "Cerimônia cadastra com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onSuccess();
    } catch (error) {
      apiErrorHandlerToast({
        title: "Erro ao cadastrar cerimônia.",
        error,
        toast,
      });
    }
  }

  return (
    <CeremonyDrawer
      title="Nova cerimônia"
      initialValues={{}}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isRequiredPassword
    />
  );
}
