import Component_Footer from "@/components/Component_Footer";
import Component_ProfileCard from "@/components/Component_ProfileCard";
import Component_SuggestCard from "@/components/Component_SuggestCard";
import { Box } from "@chakra-ui/react";

export default function Component_ProfileSide(): React.JSX.Element {
  return (
    <Box
      width="33%"
      bg={"brand.900"}
      height="100vh"
      display="flex"
      flexDir="column"
      gap={3}
      position="fixed"
      padding="16px"
      right={0}
      top={0}
      borderLeft={"1px solid #424242"}
    >
      <Component_ProfileCard />
      <Component_SuggestCard />
      <Component_Footer />
    </Box>
  );
}
