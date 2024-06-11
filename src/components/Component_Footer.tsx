import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import Logo from "@/assets/images/main-logo.png";
import { Link } from "react-router-dom";

export default function Component_Footer() {
  return (
    <Box display="flex" width="100%" height="fit-content">
      <Card
        width="100%"
        bg="#2f2f2f"
        color="white"
        padding="8px"
        borderRadius="12px"
      >
        <CardBody padding="0 8px" display="flex" alignItems="center" gap={1}>
          <Text fontWeight="semibold">
            Developed by{" "}
            <Link
              to="https://jimmiandreansa.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00a013" }}
            >
              Jimmi Andreansa
            </Link>{" "}
            •{" "}
          </Text>
          <Link
            to="https://github.com/jimmiandreansa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/jimmiandreansa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </Link>
          <Link
            to="https://www.facebook.com/jimmi.andreansa.779"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFacebook />
          </Link>
          <Link
            to="https://www.instagram.com/jivvmae/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </Link>
          <Link
            to="https://x.com/BioGraph07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillTwitterSquare />
          </Link>
        </CardBody>
        <Text
          fontSize="12px"
          display="flex"
          alignItems="center"
          padding="0 8px"
        >
          Powered by <Image src={Logo} margin="4px" width={"auto"} height={3} />{" "}
          DumbWays - #1 Coding Bootcamp Indonesia
        </Text>
      </Card>
    </Box>
  );
}
