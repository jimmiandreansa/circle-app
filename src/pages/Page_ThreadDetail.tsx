import React, { useEffect, useState } from "react";
import nav from "../../src/css/home.module.css";
import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import ArrowBackIcon from "@/assets/iconsSvg/ArrowBackIcon";
import { useNavigate, useParams } from "react-router-dom";
import { IThread } from "@/type/app";
import { getReplies, getThreadById } from "@/libs/api/call/thread";
import Component_ThreadPost from "@/components/Component_ThreadPost";
import Component_ThreadCard from "@/components/Component_ThreadCard";
import Component_LikeButton from "@/components/Buttons/Component_LikeButton";
import { format } from "date-fns";
import { TfiCommentAlt } from "react-icons/tfi";

const Page_ThreadDetail = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { threadId } = useParams();

  const [threadDetail, setThreadDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
  });
  const [replies, setReplies] = useState<IThread[]>([]);

  const fetchThreadDetail = async () => {
    try {
      const response = await getThreadById(Number(threadId));
      const resReplies = await getReplies(Number(threadId));

      console.log("response", resReplies.data.data);

      setThreadDetail(response.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThreadDetail();
  }, [threadId]);

  return (
    <Box minHeight={"100vh"}>
      <div className={nav.navv}>
        <Box
          padding="16px 16px 4px"
          pos="relative"
          position={"static"}
          bg={"#1d1d1d"}
          zIndex={"9999"}
        >
          <Heading
            color="white"
            fontSize="24px"
            marginTop="8px"
            fontWeight="semibold"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Box
              onClick={() => navigate(-1)}
              cursor={"pointer"}
              display={"flex"}
              gap={2}
              _hover={{ textDecoration: "none" }}
            >
              <ArrowBackIcon />
              Status
            </Box>
          </Heading>
        </Box>
      </div>
      <>
        <Flex
          flexDir="column"
          borderBottom={"1px solid #424242"}
          color="white"
          padding="16px"
          width="100%"
        >
          <Flex alignItems="center">
            <Avatar
              src={
                threadDetail.author?.profile?.avatar
                  ? threadDetail.author?.profile?.avatar
                  : ""
              }
              width="42px"
              height="42px"
              objectFit={"cover"}
              borderRadius={"50%"}
              marginRight={"16px"}
            />
            <Flex flexDir="column">
              <Text fontWeight="semibold">{threadDetail.author?.fullname}</Text>
              <Text color="grey">@{threadDetail.author?.username}</Text>
            </Flex>
          </Flex>
          <Box marginTop={4}>
            <Text fontSize="15px">{threadDetail.content}</Text>
            {threadDetail.image &&
              threadDetail.image.map((image) => (
                <Image
                  src={image.image}
                  mt={3}
                  height={"300px"}
                  objectFit={"contain"}
                  marginRight={"20px"}
                  borderRadius="8px"
                />
              ))}
            <Text color="gray" fontSize="14px" mt={2} mb={2}>
              {threadDetail.create
                ? format(new Date(threadDetail.create), "dd MMMM yyyy")
                : ""}
            </Text>
            <Flex gap={6} marginTop={"0"}>
              <Flex gap={6} marginTop={"0"}>
                <Flex gap={2} alignItems="center" cursor={"pointer"}>
                  <Component_LikeButton
                    threadId={threadDetail.id as number}
                    callback={fetchThreadDetail}
                  />
                  <Text color="#858585">{threadDetail._count?.like}</Text>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <TfiCommentAlt style={{ fontSize: "18px", color: "gray" }} />
                  <Text color="#858585">
                    {threadDetail._count?.replies} Reply
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
            callback={fetchThreadDetail}
          />
        </Box>
        {replies.map((reply) => (
          <Component_ThreadCard
            key={reply.id}
            thread={reply}
            isProfile={false}
            userId={reply.id!}
            isReply={true}
            callback={fetchThreadDetail}
          />
        ))}
      </>
    </Box>
  );
};

export default Page_ThreadDetail;
