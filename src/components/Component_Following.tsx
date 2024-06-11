import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Component_UserCard from "./Component_UserCard";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { getFollowingAsync } from "@/store/async/follow";
import { IUser } from "@/type/app";

interface IFollowing {
  followingId?: number;
  followerId?: number;
  following?: IUser;
}

const Component_Following: React.FC<IFollowing> = () => {
  const followings: IFollowing[] = useAppSelector(
    (state: RootState) => state.follow.follow
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFollowingAsync());
  }, []);

  return (
    <Box>
      {!followings.length ? (
        <Text color={"gray"} textAlign={"center"}>
          You don't follow anyone yet
        </Text>
      ) : (
        <Box>
          {followings.map((user, index) => (
            <Component_UserCard
              key={index}
              fullname={user.following?.fullname ?? ""}
              username={user.following?.username ?? ""}
              avatar={user.following?.profile?.avatar ?? ""}
              followingId={user.following?.id ?? 0}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Component_Following;
