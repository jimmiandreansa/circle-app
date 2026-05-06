import { IProfile } from "@/type/app";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileById } from "@/libs/api/call/profile";
import {
  Avatar,
  Box,
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
} from "@chakra-ui/react";
import ArrowBackIcon from "@/assets/iconsSvg/ArrowBackIcon";
import Component_ProfilePost from "@/components/UserProfile/Component_ProfilePost";
import Component_ProfileMedia from "@/components/UserProfile/Component_ProfileMedia";
import Component_FollowButton from "@/components/Buttons/Component_FollowButton";
import { useQuery } from "@tanstack/react-query";
import Component_LoadingSpinner from "@/components/Component_LoadingSpinner";

const Page_ProfileDetail = () => {
  const navigate = useNavigate();

  const { userId } = useParams();
  const numericUserId = Number(userId);

  const profileQuery = useQuery({
    queryKey: ["profile", numericUserId],
    enabled: Number.isFinite(numericUserId) && numericUserId > 0,
    queryFn: async () => {
      const res = await getProfileById(numericUserId);
      return res.data.data as IProfile;
    },
  });

  return (
    <Box minHeight={"100vh"}>
      {profileQuery.isLoading ? <Component_LoadingSpinner minH="260px" /> : null}
      <Box padding="16px 16px 4px">
        <Heading
          color="white"
          fontSize="22px"
          marginTop="8px"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Link onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </Link>
          {profileQuery.data?.user.fullname}
        </Heading>
      </Box>
      <Box width="100%" color="white" padding="8px">
        <Box>
          <Image
            src={
              profileQuery.data?.cover
                ? profileQuery.data?.cover
                : "https://images.unsplash.com/photo-1713558014346-ceddc512a616?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            objectFit={"cover"}
            padding="10px"
            borderRadius="20px"
            height="140px"
            width="100%"
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            paddingInline={"12px"}
          >
            <Avatar
              src={profileQuery.data?.avatar ? profileQuery.data?.avatar : ""}
              width={"80px"}
              height={"80px"}
              border="5px solid #1d1d1d"
              marginTop={-12}
              marginLeft={4}
            />
            <Component_FollowButton
              followingId={numericUserId as unknown as number}
            />
          </Box>
        </Box>
        <Box padding="4px 12px 6px 12px">
          <Text fontWeight={"semibold"} fontSize="20px">
            {profileQuery.data?.user.fullname}
          </Text>
          <Text color="gray" mb={2}>
            @{profileQuery.data?.user.username}
          </Text>
          <Text marginBottom="4px">{profileQuery.data?.bio}</Text>
          <Box display="flex" gap={4}>
            <Box display="flex" gap={1}>
              <Text fontWeight={"bold"}>{profileQuery.data?.user?.follower.length}</Text>
              <Text color="gray">Following</Text>
            </Box>
            <Box display="flex" gap={1}>
              <Text fontWeight={"bold"}>{profileQuery.data?.user?.following.length}</Text>
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
                <Component_ProfilePost />
              </TabPanel>
              <TabPanel color={"white"} padding={0}>
                <Component_ProfileMedia />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Box>
  );
};

export default Page_ProfileDetail;
