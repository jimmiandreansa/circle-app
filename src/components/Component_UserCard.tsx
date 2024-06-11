import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Component_FollowButton from "./Buttons/Component_FollowButton";
import { useNavigate } from "react-router-dom";

interface IUserCardProps {
  fullname: string;
  username: string;
  avatar: string;
  followingId: number;
}

const Component_UserCard: React.FC<IUserCardProps> = ({
  fullname,
  username,
  avatar,
  followingId
}) => {

  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      gap={4}
      marginBottom="8px"
      justifyContent={"space-between"}
    >
      <Flex gap={4}>
        <Avatar
          width="42px"
          height="42px"
          cursor="pointer"
          src={avatar}
          onClick={() => navigate(`../profile/${followingId}`)}
        />
        <Box display="flex" flexDir="column">
          <Text fontWeight="semibold" color="white" fontSize="14px">
            {fullname}
          </Text>
          <Text color="gray" fontSize="14px">
            @{username}
          </Text>
        </Box>
      </Flex>
      <Component_FollowButton followingId={followingId} />
    </Box>
  );
};

export default Component_UserCard
