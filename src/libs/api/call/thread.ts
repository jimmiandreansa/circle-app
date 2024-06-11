import {API} from "..";

export const getThreads = async () => {
  return await API.get("threads");
};

export const getMyThreads = async () => {
  return await API.get("my-thread", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createThread = async (body: {
  content: string;
  image: FileList | null;
  threadId?: number;
}) => {
  const formData = new FormData();

  if (body.image !== null) {
    for (let i = 0; i < body.image.length; i++) {
      formData.append("image", body.image[i]);
    }
  }

  if (body.threadId) {
    formData.append("threadId", body.threadId.toString());
  }

  formData.append("content", body.content);

  return await API.post("thread", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getThreadByUserId = async (userId: number) => {
  return await API.get(`thread-user/${userId}`);
};

export const getReplies = async (threadId: number) => {
  return await API.get(`replies/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getThreadById = async (id: number) => {
  return await API.get(`thread/${id}`);
};

export const deleteThread = async (threadId: number) => {
  return await API.delete(`thread/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
