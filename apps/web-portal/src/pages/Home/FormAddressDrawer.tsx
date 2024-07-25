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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Address } from "../../models/address";
import { SchemaRules } from "../../types/validation-form";
import { ControllerInput } from "../../components/ControllerInput";
import { useEffect } from "react";

const validations: SchemaRules<Address> = {
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
  const { control, handleSubmit, formState, reset } = useForm<Address>();

  useEffect(() => {
    if (isOpen) {
      reset(initialValues);
    }
  }, [initialValues, isOpen, reset]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
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
