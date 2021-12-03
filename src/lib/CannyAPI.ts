import axios, { AxiosInstance } from 'axios';

import Boards from './Boards';
import ChangelogEntries from './ChangelogEntries';
import Posts from './Posts';
import Users from './Users';

export default class CannyAPI {
  apiBaseUrl = 'https://canny.io/api/v1';
  config: ICannyAPIConfig;
  private axios: AxiosInstance;

  boards: Boards;
  users: Users;
  posts: Posts;
  changelogEntries: ChangelogEntries;

  constructor(config: ICannyAPIConfig) {
    if (!config.apiKey) {
      throw new Error(
        'You must provide a valid apiKey attribute in your configuration object. To get one, read the official Canny API documentation: https://developers.canny.io/api-reference#authentication'
      );
    }
    this.config = config;

    this.axios = axios.create({
      baseURL: this.apiBaseUrl,
      params: {
        apiKey: this.config.apiKey,
      },
    });

    this.boards = new Boards(this.axios);
    this.users = new Users(this.axios);
    this.posts = new Posts(this.axios);
    this.changelogEntries = new ChangelogEntries(this.axios);
  }
}
