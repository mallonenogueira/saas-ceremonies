import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Address } from "../../models/address";
import { SchemaRules } from "../../types/validation-form";
import { ControllerInput } from "../../components/ControllerInput";
import { useEffect } from "react";
import useSWR from "swr";

const validations: SchemaRules<Address> = {
  zipCode: {
    required: "Cep obrigatório",
    min: {
      value: 8,
      message: "Cep inválido",
    },
  },
  name: {
    required: "Nome obrigatório",
  },
  address: {
    required: "Endereço obrigatório",
  },
  city: {
    required: "Cidade obrigatória",
  },
  state: {
    required: "Estado obrigatório",
  },
};

interface AddressZipCode {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

function useZipCode(zipCode: string) {
  const toast = useToast();

  return useSWR<AddressZipCode>(
    (zipCode || "").length === 8 &&
      `https://brasilapi.com.br/api/cep/v2/${zipCode}`,
    {
      fetcher: (url: string) => fetch(url).then((r) => r.json()),
      onError: () => {
        toast({
          title: "Erro ao buscar dados do endereço.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
}

export function FormAddressDrawer({
  title,
  onClose,
  isOpen,
  onSubmit,
  initialValues,
}: {
  title: string;
  initialValues?: Address;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Address) => Promise<void>;
}) {
  const { control, handleSubmit, formState, reset, setValue, watch } =
    useForm<Address>({
      defaultValues: initialValues,
    });

  const { data } = useZipCode(watch("zipCode"));

  useEffect(() => {
    if (data) {
      setValue("city", data.city);
      setValue("address", data.street + " - " + data.neighborhood);
      setValue("state", data.state);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (isOpen) reset(initialValues);
  }, [initialValues, isOpen, reset]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      onCloseComplete={() => reset({})}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {title}
          <Divider my="2" />
        </DrawerHeader>

        <DrawerBody>
          <form id="address-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <ControllerInput
                control={control}
                name="zipCode"
                label="Cep"
                minLength={8}
                maxLength={8}
                rules={validations.zipCode}
              />

              <ControllerInput
                control={control}
                name="name"
                label="Nome"
                rules={validations.name}
              />

              <ControllerInput
                control={control}
                name="address"
                label="Endereço"
                rules={validations.address}
              />

              <ControllerInput
                control={control}
                name="complement"
                label="Complemento"
                rules={validations.complement}
              />

              <ControllerInput
                control={control}
                name="state"
                label="Estado"
                rules={validations.state}
              />

              <ControllerInput
                control={control}
                name="city"
                label="Cidade"
                rules={validations.city}
              />
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter flexDir="column" alignItems="flex-end">
          <Divider my="2" />

          <ButtonGroup size="sm">
            <Button type="button" variant="ghost" onClick={onClose}>
              Fechar
            </Button>

            <Button
              type="submit"
              form="address-form"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </ButtonGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
