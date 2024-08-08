import { z } from "zod";

export const AddressSchema = z.object({
  name: z.string({ required_error: "Nome do endereço obrigatório" }),
  address: z.string({ required_error: "Endereço obrigatório" }),
  city: z.string({ required_error: "Cidade obrigatória" }),
  state: z.string({ required_error: "Estado obrigatório" }),
  zipCode: z.string({ required_error: "Cep obrigatório" }),
  complement: z.string().optional(),
});

export const EditAddressSchema = AddressSchema;
