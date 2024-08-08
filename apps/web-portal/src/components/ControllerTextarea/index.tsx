import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Rules } from "../../types/validation-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

export function ControllerTextarea<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  ...inputProps
}: {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  rules?: Rules<T>;
} & TextareaProps) {
  const id = inputProps.id || name;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}

          <Textarea id={id} {...inputProps} {...field} />
          
          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
