export interface IThread {
  id?: number;
  content?: string;
  image?: IThreadImage[];
  userId?: number;
  threadId?: number;
  author?: IUser;
  create?: number;
  _count?: {
    replies: number;
    like: number;
  };
}

interface IThreadImage {
  id?: number;
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile?: IProfile;
  follower: IFollower;
  following: IFollowing;
}

export interface IProfile {
  id: number;
  bio?: string;
  avatar?: string;
  cover?: string;
  user: IUser;
  userId?: number;
}

export interface IFollower {
  followerId?: number;
  followingId?: number;
  id: number;
  fullname: string;
  username: string;
  profile?: IProfile;
  length: number;
}

export interface IFollowing {
  followerId?: number;
  followingId?: number;
  id: number;
  fullname: string;
  username: string;
  profile?: IProfile;
  length: number;
}
