import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import nav from "../../src/css/home.module.css";
import Component_Following from "@/components/Component_Following";
import Component_Follower from "@/components/Component_Follower";

const Page_Follow = () => {
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  return (
    <Box minHeight={"100vh"} bg={"brand.900"}>
      <div className={nav.navv}>
        <Box
          height="128px"
          padding={isLargeScreen ? "24px 16px 4px" : "16px"}
          pos="relative"
          position={"static"}
          bg={"#1d1d1d"}
          zIndex={"9999"}
        >
          <Heading
            color="white"
            fontSize={isLargeScreen ? "22px" : "18px"}
            marginTop="8px"
            marginBottom="12px"
            fontWeight="semibold"
            textAlign={isLargeScreen ? "left" : "center"}
          >
            Follows
          </Heading>
          <Flex padding="0">
            <Tabs width={"100%"} color={"white"} variant="unstyled">
              <TabList mb={"12px"}>
                <Tab
                  width={"100%"}
                  fontWeight={"bold"}
                  border={"3px solid transparent"}
                  _selected={{
                    color: "white",
                    borderBottom: "3px solid green",
                  }}
                >
                  Followers
                </Tab>
                <Tab
                  width={"100%"}
                  fontWeight={"bold"}
                  border={"3px solid transparent"}
                  _selected={{
                    color: "white",
                    borderBottom: "3px solid green",
                  }}
                >
                  Followings
                </Tab>
              </TabList>

              <TabPanels padding={0}>
                <TabPanel color={"white"} padding={0}>
                  <Component_Follower />
                </TabPanel>
                <TabPanel color={"white"} padding={0}>
                  <Component_Following />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </div>
    </Box>
  );
};

export default Page_Follow;
