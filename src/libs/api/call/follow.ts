import {API} from "..";

export const follow = async (followingId: number) => {
  return await API.post(
    "follow",
    { followingId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getFollowingById = async (followingId: number) => {
  return await API.post(
    "following-by-id",
    { followingId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getFollowing = async () => {
  return await API.get("following", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const getFollower = async () => {
  return await API.get("follower", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};
