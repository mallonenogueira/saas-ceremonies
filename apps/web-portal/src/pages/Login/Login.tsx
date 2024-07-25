import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  // Heading,
  // Text,
  Stack,
  useTheme,
  InputRightElement,
  InputGroup,
  IconButton,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useAuth } from "../../contexts/auth";
import logoUrl from "/logo.png";
import { InputIcon } from "../../components/InputIcon";

function Login() {
  const theme = useTheme();
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.signin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      backgroundColor="gray.200"
    >
      <Box maxH="250px" display="flex" alignItems="center" overflow="hidden">
        <Image src={logoUrl} height="300px" objectFit="cover" />
      </Box>

      <Stack
        as="form"
        onSubmit={handleSubmit}
        boxShadow="base"
        maxW="400px"
        w="100%"
        mx="auto"
        spacing="5"
        p="5"
        backgroundColor="whiteAlpha.300"
        borderWidth="1px"
        borderRadius={theme.radii.base}
      >
        {/* <Heading size="lg" alignSelf="center">
          Título
        </Heading> */}

        {/* <Text color={theme.colors.gray["500"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text> */}
        <FormControl>
          <FormLabel>Email</FormLabel>

          <InputGroup>
            <InputLeftElement>
              <InputIcon icon={EmailIcon} />
            </InputLeftElement>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>

          <InputGroup>
            <InputLeftElement>
              <InputIcon icon={LockIcon} />
            </InputLeftElement>

            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                color="gray.500"
                aria-label="Show password"
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button isLoading={loading} w="100%" type="submit">
          Entrar
        </Button>
      </Stack>
    </Box>
  );
}

export default Login;
