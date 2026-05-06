import {API} from "@/libs/api";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";

interface ILikeButtonProps {
  threadId: number;
  callback?: () => Promise<void>
}

const Component_LikeButton: React.FC<ILikeButtonProps> = ({ threadId, callback }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useParams();
  const queryClient = useQueryClient();

  const getLike = async () => {
    try {
      const res = await API.get(`like/${threadId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setLiked(res.data.data.like === null ? false : true)
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (loading) return;
    try {
      setLoading(true);
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
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      await queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
      await queryClient.invalidateQueries({ queryKey: ["thread", threadId, "replies"] });
      if (userId) {
        await queryClient.invalidateQueries({ queryKey: ["user", Number(userId), "threads"] });
      }

    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLike();
  }, []);

  return (
    <Box
      onClick={handleLike}
      cursor={loading ? "not-allowed" : "pointer"}
      opacity={loading ? 0.7 : 1}
      pointerEvents={loading ? "none" : "auto"}
    >
      {loading ? (
        <HashLoader color="#fff" size={18} />
      ) : liked ? (
        <GoHeartFill style={{ fontSize: "20px", color: "#f31f1f" }} />
      ) : (
        <GoHeart style={{ fontSize: "20px", color: "gray" }} />
      )}
    </Box>
  )
};

export default Component_LikeButton;
