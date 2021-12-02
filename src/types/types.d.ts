interface ICannyAPIConfig {
  apiKey: string;
}

interface ICannyBoard {
  id: string;
  created: string;
  isPrivate: boolean;
  name: string;
  postCount: number;
  url: string;
}

interface ICannyBoardWithToken extends ICannyBoard {
  token: string;
}

interface ICannyUser {
  id: string;
  avatarURL: string;
  created: Date;
  email: string;
  isAdmin: boolean;
  lastActivity: Date;
  name: string;
  url: string;
  userID: string;
}
