import { IThread } from "@/type/app";
import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
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

  const height = useBreakpointValue({ base: "36px", md: "40px", lg: "42px" });
  const width = useBreakpointValue({ base: "36px", md: "40px", lg: "42px" });
  const padding = useBreakpointValue({ base: "12px", md: "14px", lg: "16px" });
  const marginRight = useBreakpointValue({
    base: "12px",
    md: "16px",
    lg: "20px",
  });

  return (
    <Flex
      borderBottom={"1px solid #424242"}
      width="100%"
      color={"white"}
      style={{ padding }}
    >
      <Image
        src={
          thread.author?.profile?.avatar
            ? thread.author?.profile?.avatar
            : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
        }
        objectFit={"cover"}
        borderRadius={"50%"}
        cursor={isReply ? "default" : "pointer"}
        onClick={threadAuthorDetailFunc}
        style={{ height, width, marginRight }}
      />
      <Box width={"100%"}>
        <Flex alignItems={"center"} justifyContent="space-between">
          <Flex
            cursor={isReply ? "default" : "pointer"}
            onClick={threadAuthorDetailFunc}
          >
            <Flex flexDir={{ base: "column" , md: "row"}}>
              <Text
                fontWeight="semibold"
                fontSize={{ base: "15px", md: "16px", lg: "16px" }}
              >
                {thread.author?.fullname}
              </Text>
              <Flex>
                <Text
                  ms={{ base: 0, md: "2" }}
                  color="grey"
                  fontSize={{ base: "15px", md: "16px", lg: "16px" }}
                >
                  @{thread.author?.username}
                </Text>
                <Text
                  ms="2"
                  color="grey"
                  fontSize={{ base: "15px", md: "16px", lg: "16px" }}
                >
                  •{" "}
                  {thread.create
                    ? formatDistanceToNow(new Date(thread.create), {
                        addSuffix: false,
                      }).replace("about", "")
                    : ""}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            {isProfile && userId === myId ? (
              <Modal_DeleteThread threadId={thread.id} />
            ) : null}
          </Flex>
        </Flex>
        <Box onClick={threadDetailFunc}>
          <Text
            mb={0}
            cursor={isReply ? "default" : "pointer"}
            fontSize={{ base: "14px", md: "15px", lg: "15px" }}
          >
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
