import { getReplies, getThreadById } from "@/libs/api/call/thread";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Component_LikeButton from "@/components/Buttons/Component_LikeButton";
import { TfiCommentAlt } from "react-icons/tfi";
import Component_ThreadCard from "@/components/Component_ThreadCard";
import Component_ThreadPost from "@/components/Component_ThreadPost";
import { format } from "date-fns";
import { IThread } from "@/type/app";
import ArrowBackIcon from "@/assets/iconsSvg/ArrowBackIcon";

const Page_ThreadImageDetail: React.FC = () => {
  const navigate = useNavigate();
  const [threadUser, setThreadUser] = useState<IThread | null>(null);
  const [replies, setReplies] = useState<IThread[]>([]);
  const { threadId } = useParams();

  const getThreadByUserIdFunc = async () => {
    try {
      const res = await getThreadById(Number(threadId));
      const resReplies = await getReplies(Number(threadId));
      setThreadUser(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadByUserIdFunc();
  }, []);

  return (
    <Flex bg={"brand.900"} height="100vh">
      <Box position={"relative"} width="65%">
        <AwesomeSlider>
          {threadUser?.image?.map((img, index) => (
            <Box key={index} height="100vh">
              <Image
                key={index}
                src={img.image}
                cursor={"pointer"}
                onClick={() => navigate(`../detail/image/${threadId}`)}
              />
            </Box>
          ))}
        </AwesomeSlider>
        <Flex
          cursor={"pointer"}
          position={"absolute"}
          left={12}
          bottom={8}
          marginX={"auto"}
          borderRadius={50}
          padding={"8px 20px"}
          border={"1px solid white"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          _hover={{ bg: "#464646" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          <Text color={"white"} fontWeight={"bold"} fontSize={"24px"}>
            Back
          </Text>
        </Flex>
      </Box>
      <Box
        width="35%"
        minHeight={"100vh"}
        borderLeft={"1px solid #424242"}
        overflowY="auto"
      >
        <>
          <Flex
            flexDir="column"
            borderBottom={"1px solid #424242"}
            color="white"
            padding="16px"
            width="100%"
          >
            <Flex alignItems="center">
              <Image
                src={
                  threadUser?.author?.profile?.avatar
                    ? threadUser?.author?.profile?.avatar
                    : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                }
                width="42px"
                height="42px"
                objectFit={"cover"}
                borderRadius={"50%"}
                marginRight={"16px"}
              />
              <Flex flexDir="column">
                <Text fontWeight="semibold">{threadUser?.author?.fullname}</Text>
                <Text color="grey">@{threadUser?.author?.fullname}</Text>
              </Flex>
            </Flex>
            <Box marginTop={4}>
              <Text fontSize="15px">{threadUser?.content}</Text>
              <Text color="gray" fontSize="14px" mt={2} mb={2}>
                {threadUser?.create
                  ? format(new Date(threadUser.create), "dd MMMM yyyy")
                  : ""}
              </Text>
              <Flex gap={6} marginTop={"0"}>
                <Flex gap={6} marginTop={"0"}>
                  <Flex gap={2} alignItems="center" cursor={"pointer"}>
                    <Component_LikeButton
                      threadId={threadUser?.id as number}
                      callback={getThreadByUserIdFunc}
                    />
                    <Text color="#858585">{threadUser?._count?.like}</Text>
                  </Flex>
                  <Flex gap={2} alignItems={"center"}>
                    <TfiCommentAlt
                      style={{ fontSize: "18px", color: "gray" }}
                    />
                    <Text color="#858585">
                      {threadUser?._count?.replies} Reply
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Box
            display={"flex"}
            alignItems={"center"}
            borderBottom={"1px solid #424242"}
            padding="12px 16px"
          >
            <Component_ThreadPost
              threadId={Number(threadId)}
              isComment={true}
              callback={getThreadByUserIdFunc}
            />
          </Box>
          {replies.map((reply) => (
            <Component_ThreadCard
              key={reply.id}
              thread={reply}
              isReply={true}
              callback={getThreadByUserIdFunc}
              isProfile={false}
              userId={reply.id!}
            />
          ))}
        </>
      </Box>
    </Flex>
  );
};

export default Page_ThreadImageDetail;
