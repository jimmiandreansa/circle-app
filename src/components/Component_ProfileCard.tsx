import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import Modal_EditProfile from "./Modals/Modal_EditProfile";
import { useEffect } from "react";
import { getMyProfileAsync } from "@/store/async/profile";

export default function Component_ProfileCard(): React.JSX.Element {
  const profile = useAppSelector((state: RootState) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, []);

  console.log("dsfesfsefsef", profile)

  return (
    <Box display="flex" width="100%" height="fit-content">
      <Card
        width="100%"
        bg="#2f2f2f"
        color="white"
        padding="6px"
        borderRadius="12px"
      >
        <Text
          fontWeight="semibold"
          marginLeft="8px"
          marginTop="4px"
          fontSize="18px"
        >
          My Profile
        </Text>
        <Box>
          <Image
            src={
              profile?.cover
                ? profile?.cover
                : "https://images.unsplash.com/photo-1545431781-3e1b506e9a37?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            objectFit={"cover"}
            padding="10px"
            borderRadius="20px"
            height="120px"
            width="100%"
          />
          <Avatar
            src={profile?.avatar ? profile?.avatar : profile?.avatar}
            border="4px solid #2f2f2f"
            position="absolute"
            top={115}
            left={8}
            width={"65px"}
            height={"65px"}
          />
        </Box>
        <Flex minWidth="max-content" alignItems="center" marginRight="8px">
          <Spacer />
          <Modal_EditProfile />
        </Flex>
        <CardBody padding="0 12px 4px 12px">
          <Text fontWeight={"semibold"} fontSize="20px">
            {profile?.user?.fullname}
          </Text>
          <Text color="gray">@{profile?.user?.username}</Text>
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
        </CardBody>
      </Card>
    </Box>
  );
}
