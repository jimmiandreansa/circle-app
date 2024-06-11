import {API} from "..";

interface ILoginBody {
  username: string;
  password: string;
}

interface IRegisterBody {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const loginApi = async (body: ILoginBody) => {
  return await API.post("login", body)
}
export const registerApi = async (body: IRegisterBody) => {
  return await API.post("register", body)
}

export const checkAuth = async (token: string) => {
  return await API.get("check-auth", {
    headers: { Authorization: `Bearer ${token}` }, 
  })
}

export const getAllUser = async (token: string) => {
  return await API.get("users", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const searchUsers = async (query: string) => {
  return await API.get(`search-user?query=${query}`)
}

export const getUserDetail = async (userId: string) => {
  return await API.get(`user-detail/${userId}`)
}

export const setAuthToken = (token: string): void => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"]
  }
};

export const getUserSuggest = async () => {
  return await API.get("user-suggest", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}
