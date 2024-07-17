import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useTheme,
  InputRightElement,
  InputGroup,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useAuth } from "../App";

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
    <Box height="100vh" display="flex" alignItems="center">
      <Stack
        as="form"
        onSubmit={handleSubmit}
        boxShadow="base"
        maxW="400px"
        w="100%"
        mx="auto"
        spacing="5"
        p="5"
        borderWidth="1px"
        borderRadius={theme.radii.base}
      >
        <Heading size="lg" alignSelf="center">
          Título
        </Heading>

        <Text color={theme.colors.gray["500"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <EmailIcon
                color="gray.500"
                _groupFocus={{
                  color: "blue.500",
                }}
              />
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
              <LockIcon
                color="gray.500"
                _groupFocus={{
                  color: "blue.500",
                }}
              />
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
                color="gray.500"
                aria-label="Show password"
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleClick}
                _hover={{
                  color: "blue.500",
                }}
                _focus={{
                  color: "blue.500",
                }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button isLoading={loading} w="100%" type="submit" colorScheme="blue">
          Entrar
        </Button>
      </Stack>
    </Box>
  );
}

export default Login;
