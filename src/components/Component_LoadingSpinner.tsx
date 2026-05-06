import { Flex } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

type Props = {
  size?: number;
  minH?: string | number;
};

export default function Component_LoadingSpinner({
  size = 28,
  minH = "180px",
}: Props) {
  return (
    <Flex align="center" justify="center" minH={minH} width="100%">
      <HashLoader color="#fff" size={size} />
    </Flex>
  );
}

