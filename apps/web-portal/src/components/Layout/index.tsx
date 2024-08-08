import { Box, Button, Image, Link, Stack } from "@chakra-ui/react";
import logoUrl from "/logo.png";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { ArrowBackIcon } from "@chakra-ui/icons";

function CustomLink({ text, to }: { text: string; to: string }) {
  return (
    <Link
      as={NavLink}
      to={to}
      display="flex"
      justifyContent="space-between"
      pl="3"
      gap="2"
      sx={{
        ".text": {
          flex: 1,
          px: 3,
          py: 2,
          borderRadius: 10,
          color: "gray.600",
          fontSize: "sm",
          fontWeight: "normal",
        },
        ".active": {
          width: "2",
          height: "100%",
          borderTopStartRadius: 5,
          borderBottomStartRadius: 5,
        },
      }}
      _hover={{
        ".text": {
          background: "primary.50",
        },
      }}
      _activeLink={{
        ".active": {
          background: "primary.500",
        },
        ".text": {
          color: "primary.500",
          fontWeight: "semibold",
        },
      }}
    >
      <div className="text">{text}</div>
      <div className="active"></div>
    </Link>
  );
}

export function Layout() {
  const auth = useAuth();

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      backgroundColor="gray.200"
    >
      <Box
        display="flex"
        flexDir="column"
        height="100vh"
        width="250px"
        borderRight="1px solid"
        borderColor="gray.300"
      >
        <Image
          src={logoUrl}
          width={220}
          height={100}
          alignSelf="center"
          objectFit="cover"
        />
        <Stack as="nav" spacing={2}>
          <CustomLink to="/" text="Home" />
          <CustomLink to="/users" text="Usuários" />
          <CustomLink to="/address" text="Endereços" />
          <CustomLink to="/ceremonies" text="Cerimônias" />
        </Stack>

        <Box mt="auto" mx="3" mb="3">
          <Button
            leftIcon={<ArrowBackIcon />}
            width="full"
            size="sm"
            variant="ghost"
            onClick={auth.signout}
            display="flex"
            gap="2"
            justifyContent="flex-start"
          >
            Sair
          </Button>
        </Box>
      </Box>

      <Box as="main" height="100vh" flex="1">
        <Outlet />
      </Box>
    </Box>
  );
}
