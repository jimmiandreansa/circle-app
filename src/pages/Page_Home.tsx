import React from "react";
import nav from "../../src/css/home.module.css";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import Component_ThreadCard from "@/components/Component_ThreadCard";
import Component_ThreadPost from "@/components/Component_ThreadPost";
import { useQuery } from "@tanstack/react-query";
import { getThreads } from "@/libs/api/call/thread";
import { IThread } from "@/type/app";
import Component_LoadingSpinner from "@/components/Component_LoadingSpinner";

const Page_Home = (): React.JSX.Element => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const threadsQuery = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await getThreads();
      return res.data.data as IThread[];
    },
  });

  const padding = useBreakpointValue({ base: "12px", md: "14px", lg: "16px" });

  return (
    <Box minHeight="100vh" bg={"brand.900"}>
      <div className={nav.navv}>
        <Box
          borderBottom={"1px solid #424242"}
          borderLeft={{ base: "1px solid #424242", md: "none" }}
          pos="relative"
          position={"static"}
          bg={"#1d1d1d"}
          style={{ padding }}
        >
          <Heading
            display={isLargeScreen ? "block" : "none"}
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
      {threadsQuery.isLoading ? (
        <Component_LoadingSpinner minH="280px" />
      ) : (
        (threadsQuery.data ?? []).map((thread) => (
          <Component_ThreadCard
            key={thread.id}
            thread={thread}
            isProfile={false}
            userId={thread.userId as number}
            isReply={false}
          />
        ))
      )}
    </Box>
  );
};

export default Page_Home;
