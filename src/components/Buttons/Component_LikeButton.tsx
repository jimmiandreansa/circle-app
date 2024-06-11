import {API} from "@/libs/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { getMyThreadAsync, getThreadAsync, getThreadByIdAsync } from "@/store/async/thread";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useParams } from "react-router-dom";

interface ILikeButtonProps {
  threadId: number;
  callback?: () => Promise<void>
}

const Component_LikeButton: React.FC<ILikeButtonProps> = ({ threadId, callback }) => {
  const profile = useAppSelector((state) => state.auth.user);
  const [liked, setLiked] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const { userId } = useParams();

  const getLike = async () => {
    try {
      const res = await API.get(`like/${threadId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setLiked(res.data.data.like === null ? false : true)

      if(callback) {
        await callback()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.post(
        "like",
        {
          threadId: threadId
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      console.log(res)

      await getLike()

      if (callback) {
        await callback();
      }

      await dispatch(getThreadAsync())
      if (profile?.id) {
        await dispatch(getMyThreadAsync(profile.id))
      }
      if (userId) {
        await dispatch(getThreadByIdAsync(+userId))
      }

    } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getLike();
  }, []);

  return (
    <Box onClick={handleLike}>
      {liked ? (
        <GoHeartFill style={{ fontSize: "20px", color: "#f31f1f" }} />
      ) : (
        <GoHeart style={{ fontSize: "20px", color: "gray" }} />
      )}
    </Box>
  )
};

export default Component_LikeButton;
