import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Page_ForgotPassword = () => {
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
        <Text color="white" fontSize={"20px"} marginBottom={3}>
          Forgot password
        </Text>
        <FormControl>
          <Input
            type={"email"}
            color={"white"}
            borderColor={"gray"}
            marginBottom={2}
            placeholder={"Email"}
          />
          <Button
            borderRadius={"20px"}
            bg={"#00a013"}
            color={"white"}
            width={"100%"}
            _hover={{ bg: "green" }}
          >
            Send Instruction
          </Button>
        </FormControl>
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
            color={"#00a013"}
            fontWeight={"semibold"}
          >
            Login
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page_ForgotPassword;
