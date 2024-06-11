import { IThread } from "@/type/app";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Component_LikeButton from "./Buttons/Component_LikeButton";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import Modal_DeleteThread from "./Modals/Modal_DeleteThread";
import { formatDistanceToNow } from "date-fns";
import { TfiCommentAlt } from "react-icons/tfi";
import { getThreads } from "@/libs/api/call/thread";
import { useEffect, useState } from "react";
import { getThreadByIdAsync, getThreadReplyAsync } from "@/store/async/thread";

interface IThreadCardProps {
  thread: IThread;
  isProfile: boolean;
  userId: number;
  isReply: boolean;
  callback?: () => void;
}

const Component_ThreadCard: React.FC<IThreadCardProps> = ({
  thread,
  isProfile,
  userId,
  isReply,
  callback,
}) => {
  const profile = useAppSelector((state: RootState) => state.auth.user);
  const myId = profile?.userId;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [threads, setThreads] = useState<IThread[] | []>([]);
  console.log(threads);

  async function getThreadFunc() {
    try {
      const res = await getThreads();
      if (callback) {
        await callback();
      }
      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function threadDetailFunc() {
    if (!isReply) {
      navigate(`../detail/${thread.id}`);
    }
  }

  function threadAuthorDetailFunc() {
    if (!isReply) {
      navigate(`../profile/${userId}`);
    }
  }

  useEffect(() => {
    if (thread.id) {
      dispatch(getThreadByIdAsync(Number(thread.id)));
      dispatch(getThreadReplyAsync(Number(thread.id)));
    }
  }, []);

  return (
    <Flex
      borderBottom={"1px solid #424242"}
      color="white"
      padding="16px"
      width="100%"
    >
      <Image
        src={
          thread.author?.profile?.avatar
            ? thread.author?.profile?.avatar
            : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
        }
        minWidth="42px"
        maxWidth="42px"
        minHeight="42px"
        maxHeight="42px"
        objectFit={"cover"}
        borderRadius={"50%"}
        marginRight={"20px"}
        cursor={isReply ? "default" : "pointer"}
        onClick={threadAuthorDetailFunc}
      />
      <Box width={"100%"}>
        <Flex alignItems={"center"} justifyContent="space-between">
          <Flex
            cursor={isReply ? "default" : "pointer"}
            onClick={threadAuthorDetailFunc}
          >
            <Text fontWeight="semibold">{thread.author?.fullname}</Text>
            <Text ms="2" color="grey">
              @{thread.author?.username}
            </Text>
            <Text ms="2" color="grey">
              •{" "}
              {thread.create
                ? formatDistanceToNow(new Date(thread.create), {
                    addSuffix: false,
                  }).replace("about", "")
                : ""}
            </Text>
          </Flex>
          <Flex>
            {isProfile && userId === myId ? (
              <Modal_DeleteThread threadId={thread.id} />
            ) : null}
          </Flex>
        </Flex>
        <Box onClick={threadDetailFunc}>
          <Text fontSize="15px" mb={0} cursor={isReply ? "default" : "pointer"}>
            {thread.content}
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "12px",
              margin: "6px 0",
            }}
          >
            {thread.image &&
              thread.image.map((image, index: number) => (
                <Image
                  key={index}
                  src={image.image}
                  alt="image not found!"
                  cursor={"pointer"}
                  maxHeight={"300px"}
                  objectFit={"contain"}
                  borderRadius="8px"
                />
              ))}
          </div>
        </Box>
        <Flex gap={6} marginTop={"0"}>
          <Flex gap={2} alignItems="center" cursor={"pointer"}>
            <Component_LikeButton
              threadId={thread.id as number}
              callback={getThreadFunc}
            />
            <Text color="#858585">{thread._count?.like}</Text>
          </Flex>
          {isReply ? null : (
            <Flex
              gap={2}
              alignItems="center"
              cursor={"pointer"}
              onClick={() => navigate(`../detail/${thread.id}`)}
            >
              <TfiCommentAlt style={{ fontSize: "18px", color: "gray" }} />
              <Text color="#858585">{thread._count?.replies} Reply</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Component_ThreadCard;
