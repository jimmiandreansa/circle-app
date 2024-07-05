import {API} from "..";

export const getProfile = async () => {
  return await API.get("profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getMyProfile = async () => {
  return await API.get("profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updatedProfile = async (body: {
  username?: string;
  fullname?: string;
  bio?: string | null;
  avatar?: File | null | string;
  cover?: File | null | string;
}) => {
  const formData = new FormData();
  if (body.username) {
    formData.append("username", body.username);
  }
  if (body.fullname) {
    formData.append("fullname", body.fullname);
  }
  if (body.bio !== null && body.bio !== undefined) {
    formData.append("bio", body.bio);
  }
  if (body.avatar) {
    formData.append("avatar", body.avatar);
  }
  if (body.cover) {
    formData.append("cover", body.cover);
  }
  
  // Check if formData has any entries
  if (
    !formData.has("username") &&
    !formData.has("fullname") &&
    !formData.has("bio") &&
    !formData.has("avatar") &&
    !formData.has("cover")
  ) {
    throw new Error("No profile data to update");
  }

  try {
    const response = await API.patch("profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
};


export const getProfileById = async (userId: number) => {
  return await API.get(`detail-profile/${userId}`);
};
