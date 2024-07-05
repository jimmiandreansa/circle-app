import { useAppSelector } from "@/store";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyThreads } from "@/libs/api/call/thread";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ArrowBackIcon from "@/assets/iconsSvg/ArrowBackIcon";
import Component_MyProfilePost from "@/components/MyProfile/Component_MyProfilePost";
import Component_MyProfileMedia from "@/components/MyProfile/Component_MyProfileMedia";
import Modal_EditProfile from "@/components/Modals/Modal_EditProfile";

const Page_MyProfile: FC = (): React.JSX.Element => {
  const [threadUser, setThreadUser] = useState([]);
  const profile = useAppSelector((state) => state.auth.user);
  const userId = profile?.userId;
  const navigate = useNavigate();

  const getThreadByUserIdFunc = async () => {
    try {
      const res = await getMyThreads();
      setThreadUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadByUserIdFunc();
  }, []);

  const isLargeScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  return (
    <Box minHeight={"100vh"} bg={"brand.900"}>
      <Box padding="16px 16px 4px">
        <Heading
          color="white"
          fontSize={isLargeScreen ? "22px" : "20px"}
          marginTop="8px"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Link onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Link>
          My Profile
        </Heading>
      </Box>
      <Box width="100%" color="white" padding="8px">
        <Box>
          <Image
            src={
              profile?.cover
                ? profile?.cover
                : "https://images.unsplash.com/photo-1713558014346-ceddc512a616?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            objectFit={"cover"}
            padding="10px"
            borderRadius="20px"
            height={isLargeScreen ? '140px' : "100px"}
            width="100%"
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            paddingInline={"12px"}
          >
            <Avatar
              src={
                profile?.avatar
                  ? profile?.avatar
                  : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              }
              width={{base: "74px", md: "80px"}}
              height={{ base: "75px", md: "80px"}}
              border="5px solid #1d1d1d"
              marginTop={-12}
              marginLeft={4}
            />
            <Modal_EditProfile />
          </Box>
        </Box>
        <Box padding="4px 12px 6px 12px">
          <Text fontWeight={"semibold"} fontSize={isLargeScreen ? "20px" : "18px"} marginTop={isLargeScreen ? 0 : 2}>
            {profile?.user.fullname}
          </Text>
          <Text color="gray" mb={2}>
            @{profile?.user.username}
          </Text>
          <Divider bg={"black"} />
          <Text marginBottom="4px">{profile?.bio}</Text>
          <Box display="flex" gap={4}>
            <Box display="flex" gap={1}>
              <Text fontWeight={"bold"}>{profile?.user?.follower.length}</Text>
              <Text color="gray">Following</Text>
            </Box>
            <Box display="flex" gap={1}>
              <Text fontWeight={"bold"}>{profile?.user?.following.length}</Text>
              <Text color="gray">Followers</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Flex borderBottom={"1px solid #424242"} padding="0">
          <Tabs width={"100%"} color={"white"} variant="unstyled">
            <TabList style={{ borderBottom: "1px solid #424242" }}>
              <Tab
                width={"100%"}
                fontWeight={"bold"}
                border={"3px solid transparent"}
                _selected={{ color: "white", borderBottom: "3px solid green" }}
              >
                All Post
              </Tab>
              <Tab
                width={"100%"}
                fontWeight={"bold"}
                border={"3px solid transparent"}
                _selected={{ color: "white", borderBottom: "3px solid green" }}
              >
                Media
              </Tab>
            </TabList>

            <TabPanels padding={0}>
              <TabPanel color={"white"} padding={0}>
                <Component_MyProfilePost
                  userId={userId!}
                  thread={threadUser}
                  callback={getThreadByUserIdFunc}
                />
              </TabPanel>
              <TabPanel color={"white"} padding={0}>
                <Component_MyProfileMedia userId={userId!} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Box>
  );
};

export default Page_MyProfile;
