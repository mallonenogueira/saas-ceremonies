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
import { SchemaRules } from "../../types/validation-form";
import { ControllerInput } from "../../components/ControllerInput";
import { User } from "../../models/user";
import { useEffect } from "react";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validations: SchemaRules<User> = {
  name: {
    required: "Nome obrigatório",
  },
  email: {
    pattern: {
      value: EMAIL_PATTERN,
      message: "Email inválido",
    },
    required: "Email obrigatório",
  },
  password: {
    required: "Senha obrigatória",
  },
};

export function FormUserDrawer({
  title,
  onClose,
  isOpen,
  onSubmit,
  initialValues,
  isRequiredPassword,
}: {
  title: string;
  initialValues?: Partial<User>;
  isOpen: boolean;
  isRequiredPassword?: boolean;
  onClose: () => void;
  onSubmit: (values: User) => Promise<void>;
}) {
  const { control, handleSubmit, formState, reset } = useForm<User>({
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialValues);
    }
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
          <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <ControllerInput
                control={control}
                name="name"
                label="Nome"
                rules={validations.name}
              />

              <ControllerInput
                control={control}
                name="email"
                label="Email"
                rules={validations.email}
              />

              <ControllerInput
                control={control}
                name="password"
                label="Nova senha"
                rules={isRequiredPassword ? validations.password : undefined}
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
              form="user-form"
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
