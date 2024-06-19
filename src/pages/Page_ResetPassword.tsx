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

const Page_ResetPassword = () => {
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
          Reset password
        </Text>
        <FormControl>
          <Input
            type="password"
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="New Password"
          />
          <Input
            type="password"
            color="white"
            borderColor="gray"
            marginBottom={2}
            placeholder="Confirm New Password"
          />
          <Button
            borderRadius="20px"
            bg={"#00a013"}
            color="white"
            width="100%"
            _hover={{ bg: "green" }}
          >
            Create New Password
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default Page_ResetPassword
