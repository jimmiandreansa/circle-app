import { useEffect, useState } from "react";
import { IThread } from "@/type/app";
import Component_ThreadCard from "../Component_ThreadCard";
import { useParams } from "react-router-dom";
import { getThreadByUserId } from "@/libs/api/call/thread";

const Component_ProfilePost = () => {
  const [threadUser, setThreadUser] = useState([]);
  const { userId } = useParams();

  const getThreadByUserIdFunc = async () => {
    try {
      const res = await getThreadByUserId(Number(userId));
      setThreadUser(res.data.data);
    } catch (error) { 
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadByUserIdFunc();
  }, []);
  return (
    <>
      {threadUser?.map((post: IThread) => (
        <Component_ThreadCard
          thread={post}
          isProfile={true}
          userId={Number(userId)}
          isReply={false}
          callback={getThreadByUserIdFunc}
        />
      ))}
    </>
  );
};

export default Component_ProfilePost;
