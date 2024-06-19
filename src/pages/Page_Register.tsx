import { Box, Button, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { registerAsync } from "@/store/async/auth";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import HashLoader from "react-spinners/HashLoader";

const Page_Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage, loading, isError } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [registerForm, setRegisterForm] = useState<{
    fullname: string;
    username: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(registerAsync(registerForm));

      if (!isError) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg="#1d1d1d">
      <Flex
        minHeight="100vh"
        flexDir="column"
        width={{ base: "80%", md: "50%", lg: "30%" }}
        justifyContent="center"
        margin="auto"
      >
        <Heading color="#00a013" display={"flex"} gap={1} alignItems={"center"}>
          <Image
            boxSize="28px"
            src="https://gcdnb.pbrd.co/images/IjucgOcWuO1g.png?o=1"
            alt="Circle Logo"
          />
          circle
        </Heading>
        <Text color="white" fontSize={"20px"} marginBottom={3}>
          Create account Circle
        </Text>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            autoComplete="off"
            required
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="Full Name"
            name="fullname"
            value={registerForm.fullname}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, fullname: e.target.value })
            }
          />
          <Input
            type="text"
            autoComplete="off"
            required
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="Username"
            name="username"
            value={registerForm.username}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, username: e.target.value })
            }
          />
          <Input
            type="email"
            autoComplete="off"
            required
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="Email"
            name="email"
            value={registerForm.email}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, email: e.target.value })
            }
          />
          <Input
            type="password"
            autoComplete="off"
            required
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="Password"
            name="password"
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, password: e.target.value })
            }
          />
          <Button
            type="submit"
            borderRadius="20px"
            bg={"#00a013"}
            color="white"
            width="100%"
            _hover={{ bg: "green" }}
          >
            {loading ? (
              <HashLoader color={"#fff"} loading={loading} size={24} />
            ) : (
              "Register"
            )}
          </Button>
        </form>
        {!errorMessage ? null : (
          <Text textAlign={"center"} mt={1} fontSize={"14px"} color={"red"}>
            {errorMessage}
          </Text>
        )}
        <Flex
          gap={2}
          marginTop={2}
          fontSize={{ base: "14px", md: "16px" }}
          marginX={{ base: "auto", md: "0" }}
        >
          <Text color="white">Already have account? </Text>
          <ChakraLink
            as={ReactRouterLink}
            to="/login"
            color="#00a013"
            fontWeight={"semibold"}
          >
            Login
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page_Register;
