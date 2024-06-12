import React, { useEffect } from "react";
import nav from "../../src/css/home.module.css";
import { Box, Heading } from "@chakra-ui/react";
import Component_ThreadCard from "@/components/Component_ThreadCard";
import Component_ThreadPost from "@/components/Component_ThreadPost";
import { getThreadAsync } from "@/store/async/thread";
import { useAppDispatch, useAppSelector } from "@/store";

const Page_Home = (): React.JSX.Element => {
  const threads = useAppSelector((state) => state.thread.threads)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getThreadAsync());
  }, []);
  return (
    <Box minHeight="100vh">
      <div className={nav.navv}>
        <Box
          borderBottom={"1px solid #424242"}
          height="128px"
          padding="16px"
          pos="relative"
          position={"static"}
          bg={"#1d1d1d"}
          zIndex={"9999"}
        >
          <Heading
            color="white"
            fontSize="24px"
            marginTop="8px"
            marginBottom="12px"
            fontWeight="semibold"
          >
            Home
          </Heading>
          <Component_ThreadPost isComment={false} />
        </Box>
      </div>
      {threads.map((thread) => (
        <Component_ThreadCard
          key={thread.id}
          thread={thread}
          isProfile={false}
          userId={thread.userId as number}
          isReply={false}
        />
      ))}
    </Box>
  );
};

export default Page_Home;
