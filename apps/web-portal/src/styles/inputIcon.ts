import { defineStyleConfig } from "@chakra-ui/react";

export const inputIconStyle = defineStyleConfig({
  baseStyle: {
    color: "gray.500",
    _groupFocus: {
      color: "primary.500",
    },
  },
});
