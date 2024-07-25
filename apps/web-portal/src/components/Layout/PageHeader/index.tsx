import { Box } from "@chakra-ui/react";

export function PageHeader() {
  return (
    <Box
      as="header"
      height="70px"
      borderBottom="1px solid"
      borderColor="gray.300"
      position="sticky"
      top="0"
      left="0"
      right="0"
      p="4"
      display="flex"
      alignItems="center"
    ></Box>
  );
}
