import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type Rules<T extends FieldValues = FieldValues> = Omit<
  RegisterOptions<T>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type SchemaRules<T extends FieldValues> = Partial<Record<Path<T>, Rules<T>>>;