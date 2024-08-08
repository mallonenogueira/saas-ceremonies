import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Rules } from "../../types/validation-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

export function ControllerInput<T extends FieldValues>({
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
} & InputProps) {
  const id = inputProps.id || name;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}

          <Input id={id} {...inputProps} {...field} />
          
          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
