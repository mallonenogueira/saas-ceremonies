import { Box } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/auth";

export function PageHeader() {
  const { user } = useAuth();
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
    >
      <b>Usuário: </b> {user?.name}
    </Box>
  );
}
