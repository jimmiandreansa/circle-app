import { follow, getFollowingById } from "@/libs/api/call/follow";
import { useAppDispatch } from "@/store";
import { getProfileAsync } from "@/store/async/auth";
import { getFollowingAsync } from "@/store/async/follow";
import { getMyProfileAsync } from "@/store/async/profile";
import { getUserSuggestAsync } from "@/store/async/user";
import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface IFollowButtonProps {
  followingId: number;
}

const Component_FollowButton: React.FC<IFollowButtonProps> = ({
  followingId,
}) => {
  const [postFollow, setPostFollow] = useState<boolean>(false);
  const [followTrigger, setFollowTrigger] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFollow = async () => {
    try {
      await follow(followingId);
      setFollowTrigger(!followTrigger);

      await dispatch(getProfileAsync());
      await dispatch(getMyProfileAsync());
      await dispatch(getFollowingAsync());
      await dispatch(getUserSuggestAsync());
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const res = await getFollowingById(followingId);
      const response = res.data.data;

      if (response !== null) {
        setPostFollow(true);
      } else {
        setPostFollow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowers();
  }, [followTrigger]);

  return (
    <Box>
      <Button
        fontSize={"14px"}
        variant={"outline"}
        borderRadius={"20px"}
        color={postFollow ? "#00a013" : "white"}
        borderColor={"#00a013"}
        backgroundColor={postFollow ? "transparent" : "#00a013"}
        height={"32px"}
        _hover={{ backgroundColor: "#028311", color: "#c0c0c0" }}
        onClick={handleFollow}
      >
        {postFollow ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
};

export default Component_FollowButton;
