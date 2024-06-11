import { getFollower } from "@/libs/api/call/follow";
import { IUser } from "@/type/app";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Component_UserCard from "./Component_UserCard";

const Component_Follower = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);

  const getFollowerFunc = async () => {
    try {
      const res = await getFollower();
      setFollowers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowerFunc();
  }, []);

  return (
    <Box>
      {!followers.length ? (
        <Text color={"gray"} textAlign={"center"}>
          You don't have any followers
        </Text>
      ) : (
        <Box>
          {followers.map((user, index) => (
            <Component_UserCard
              key={index}
              fullname={user.follower.fullname}
              username={user.follower.username}
              avatar={user.follower.profile?.avatar as string}
              followingId={user.follower.id}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Component_Follower;
