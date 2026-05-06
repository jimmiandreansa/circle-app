import { IThread } from "@/type/app";
import Component_ThreadCard from "../Component_ThreadCard";
import { useParams } from "react-router-dom";
import { getThreadByUserId } from "@/libs/api/call/thread";
import { useQuery } from "@tanstack/react-query";
import Component_LoadingSpinner from "../Component_LoadingSpinner";

const Component_ProfilePost = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);

  const threadsQuery = useQuery({
    queryKey: ["user", numericUserId, "threads"],
    enabled: Number.isFinite(numericUserId) && numericUserId > 0,
    queryFn: async () => {
      const res = await getThreadByUserId(numericUserId);
      return res.data.data as IThread[];
    },
  });

  const refetchThreads = async () => {
    await threadsQuery.refetch();
  };

  if (threadsQuery.isLoading) return <Component_LoadingSpinner minH="220px" />;

  return (
    <>
      {(threadsQuery.data ?? []).map((post: IThread) => (
        <Component_ThreadCard
          thread={post}
          isProfile={true}
          userId={numericUserId}
          isReply={false}
          callback={refetchThreads}
        />
      ))}
    </>
  );
};

export default Component_ProfilePost;
