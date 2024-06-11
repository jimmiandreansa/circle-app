import {API} from "..";

export const createLike = async (threadId: number) => {
  return await API.post(
    "like",
    { threadId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getLike = async (threadId: number) => {
  return await API.get(`thread/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
