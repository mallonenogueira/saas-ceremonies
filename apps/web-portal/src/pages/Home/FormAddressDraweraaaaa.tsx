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
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
} from "react-hook-form";
import { Address } from "../../models/address";
import { api } from "../../services/api";

type Rules<T extends FieldValues = FieldValues> = Omit<
  RegisterOptions<T>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;
type SchemaRules<T extends FieldValues> = Partial<Record<Path<T>, Rules<T>>>;

function ControllerInput<T extends FieldValues>({
  name,
  label,
  control,
  rules,
}: {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  rules?: Rules<T>;
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <Input id={name} {...field} />

          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
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
  onClose,
  isOpen,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { control, handleSubmit, formState, reset } = useForm<Address>();
  const toast = useToast();

  async function onSubmit(values: Address) {
    await api.post("/address", values);

    onSuccess();
    setTimeout(reset, 1000);

    toast({
      title: "Endereço cadastro com sucesso.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Novo endereço
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
