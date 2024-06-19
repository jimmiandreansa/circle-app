import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { getProfileAsync, loginAsync } from "@/store/async/auth";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import HashLoader from "react-spinners/HashLoader";

const Page_Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage, loading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [formInput, setFormInput] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginAsync(formInput));
      await dispatch(getProfileAsync());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg={"#1d1d1d"}>
      <Flex
        minHeight={"100vh"}
        flexDir={"column"}
        width={{ base: "80%", md: "50%", lg: "30%" }}
        justifyContent={"center"}
        margin={"auto"}
      >
        <Heading color="#00a013" display={"flex"} gap={1} alignItems={"center"}>
          <Image
            boxSize="28px"
            src="https://gcdnb.pbrd.co/images/IjucgOcWuO1g.png?o=1"
            alt="Circle Logo"
          />
          circle
        </Heading>
        <Text color={"white"} fontSize={"20px"} marginBottom={3}>
          Login to Circle
        </Text>
        <form onSubmit={handleLogin}>
          <Input
            type={"text"}
            required
            color={"white"}
            borderColor={"gray"}
            marginBottom={2}
            placeholder={"Email / Username"}
            name={"email"}
            autoComplete={"off"}
            value={formInput.username}
            onChange={(e) =>
              setFormInput({ ...formInput, username: e.target.value })
            }
          />
          <Input
            type={"password"}
            required
            color={"white"}
            borderColor={"gray"}
            marginBottom={2}
            placeholder={"Password"}
            name={"password"}
            autoComplete={"off"}
            value={formInput.password}
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
          />
          <Box
            textAlign={"end"}
            marginBottom={2}
            fontSize={{ base: "14px", md: "16px" }}
          >
            <ChakraLink
              as={ReactRouterLink}
              to={"/forgot-password"}
              color={"white"}
            >
              Forgot password?
            </ChakraLink>
          </Box>
          <Button
            borderRadius={"20px"}
            bg={"#00a013"}
            color={"white"}
            width={"100%"}
            _hover={{ bg: "green" }}
            type={"submit"}
          >
            {loading ? (
              <HashLoader color={"#fff"} loading={loading} size={24} />
            ) : (
              "Login"
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
          <Text color="white">Don't have an account yet? </Text>
          <ChakraLink
            as={ReactRouterLink}
            to={"/register"}
            color={"#00a013"}
            fontWeight={"semibold"}
          >
            Create account
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page_Login;
