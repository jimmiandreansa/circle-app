import { Box, Card, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Component_UserCard from "./Component_UserCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserSuggestAsync } from "@/store/async/user";

export default function Component_SuggestCard (): React.JSX.Element {
  const users = useAppSelector((state) => state.user.users)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getUserSuggestAsync())
  }, []);

  return (
    <Box display="flex" width="100%" height={"fit-content"}>
      <Card
        width="100%"
        bg="#2f2f2f"
        color="white"
        padding="8px 16px"
        borderRadius="12px"
      >
        <Text
          fontWeight="semibold"
          marginTop="4px"
          marginBottom="10px"
          fontSize="18px"
        >
          Suggested for You
        </Text>
        {users?.map((user) => (
          <Component_UserCard
            key={user.id}
            fullname={user.fullname}
            username={user.username}
            avatar={user.profile?.avatar as string}
            followingId={user.id}
          />
        ))}
      </Card>
    </Box>
  );
}
