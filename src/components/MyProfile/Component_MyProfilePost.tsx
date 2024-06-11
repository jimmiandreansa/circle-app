import { FC, useEffect } from "react";
import { IThread } from "@/type/app";
import Component_ThreadCard from "../Component_ThreadCard";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { getMyThreadAsync } from "@/store/async/thread";
import { Box, Text } from "@chakra-ui/react";
interface IProps {
  userId: number;
  thread: IThread[];
  callback: () => void;
}

const Component_MyProfilePost: FC<IProps> = ({ userId }) => {
  const thread = useAppSelector((state: RootState) => state.thread.myThreads);

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (profile?.id) {
      dispatch(getMyThreadAsync(profile.id));
    }
  }, []);

  return (
    <>
      <Box>
        {!thread.length && (
          <Text color={"gray"} textAlign={"center"}>
            No post yet
          </Text>
        )}
      </Box>
      {thread.map((post: IThread) => (
        <Component_ThreadCard
          thread={post}
          isProfile={true}
          userId={Number(userId)}
          isReply={false}
        />
      ))}
    </>
  );
};

export default Component_MyProfilePost;
