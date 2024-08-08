import { CreateToastFnReturn } from "@chakra-ui/react";
import { isAxiosError } from "axios";

export function apiErrorHandlerToast({
  error,
  title,
  toast,
}: {
  error: unknown;
  title: string;
  toast: CreateToastFnReturn;
}) {
  if (isAxiosError(error) && Array.isArray(error.response?.data?.errors)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors = error.response.data.errors as Array<any>;

    toast({
      title,
      description: (
        <>
          {errors
            ?.filter((error) => error.message)
            ?.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
        </>
      ),
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } else {
    toast({
      title,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}
