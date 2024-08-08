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
  FormLabel,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SchemaRules } from "../../types/validation-form";
import { ControllerInput } from "../../components/ControllerInput";
import { Ceremony } from "../../models/ceremony";
import { addDays, format, isValid, parseISO } from "date-fns";

import { TextEditor } from "../../components/Editor";
import { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import { ControllerTextarea } from "../../components/ControllerTextarea";

function isValidDate(value: string) {
  return isValid(new Date(value));
}

const dateValidate = (message = "Data inválida") =>
  function <T>(value: T) {
    if (!value) return true;

    return (typeof value === "string" && isValidDate(value)) || message;
  };

const validations: SchemaRules<Ceremony> = {
  peopleName: {
    required: "Nome obrigatório",
  },
  start: {
    validate: dateValidate(),
  },
  end: {
    validate: dateValidate(),
  },
  peopleBirthDate: {
    validate: dateValidate(),
  },
  peopleDeathDate: {
    validate: dateValidate(),
  },
};

export function CeremonyDrawer({
  title,
  onClose,
  isOpen,
  onSubmit,
  initialValues,
}: {
  title: string;
  initialValues?: Partial<Ceremony>;
  isOpen: boolean;
  isRequiredPassword?: boolean;
  onClose: () => void;
  onSubmit: (values: Ceremony) => Promise<void>;
}) {
  const editorRef = useRef<Editor | null>(null);

  const { control, handleSubmit, formState, reset } = useForm<Ceremony>();

  function onSubmitHandleEditor(values: Ceremony) {
    onSubmit({
      ...values,
      peopleHistory: editorRef.current?.getHTML() || undefined,
    });
  }

  useEffect(() => {
    if (isOpen) {
      console.log(convertToDate(initialValues?.peopleBirthDate));
      reset({
        ...initialValues,
        peopleBirthDate: convertToDate(initialValues?.peopleBirthDate),
        peopleDeathDate: convertToDate(initialValues?.peopleDeathDate),
        start: convertToDatetime(initialValues?.start),
        end: convertToDatetime(initialValues?.end),
      });
    }
  }, [initialValues, isOpen, reset]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
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
          <form
            id="ceremony-form"
            onSubmit={handleSubmit(onSubmitHandleEditor)}
          >
            <Stack spacing={4}>
              <ControllerInput
                control={control}
                name="peopleName"
                label="Nome"
                rules={validations.peopleName}
              />

              <HStack spacing={"4"}>
                <ControllerInput
                  control={control}
                  name="peopleBirthDate"
                  label="Data de nascimento"
                  type="date"
                  rules={validations.peopleBirthDate}
                />

                <ControllerInput
                  control={control}
                  name="peopleDeathDate"
                  label="Data de falescimento"
                  type="date"
                  rules={validations.peopleDeathDate}
                />
              </HStack>

              <div>
                <FormLabel>Adicione uma história</FormLabel>

                <TextEditor
                  editorRef={editorRef}
                  content={initialValues?.peopleHistory || ""}
                />
              </div>

              <Heading as="h2" size="md" my="2">
                Dados da cerimônias
              </Heading>

              <ControllerTextarea
                control={control}
                name="description"
                label="Descrição"
              />

              <HStack spacing={"4"}>
                <ControllerInput
                  control={control}
                  name="start"
                  label="Início"
                  type="datetime-local"
                  rules={validations.start}
                />

                <ControllerInput
                  control={control}
                  name="end"
                  label="Fim"
                  type="datetime-local"
                  rules={validations.end}
                />
              </HStack>
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
              form="ceremony-form"
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
function convertToDate(date?: string) {
  if (!date) return;
  /**
   * Adiciona um dia pq o diabo do type="date" estava voltando 1 dia ao editar
   * Provavelmente tem algo relacionado ao fuso horario pq a hora vem 00:00
   */
  return format(addDays(parseISO(date), 1), "yyyy-MM-dd");
}

function convertToDatetime(date?: string) {
  return date && format(parseISO(date), "yyyy-MM-dd'T'HH:mm");
}
