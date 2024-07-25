import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Rules } from "../../types/validation-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export function ControllerInput<T extends FieldValues>({
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
