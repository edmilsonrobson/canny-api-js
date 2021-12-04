import axios, { AxiosInstance } from 'axios';

import Boards from './Boards';
import ChangelogEntries from './ChangelogEntries';
import Comments from './Comments';
import Companies from './Companies';
import Opportunities from './Opportunities';
import Posts from './Posts';
import StatusChanges from './StatusChanges';
import Tags from './Tags';
import Users from './Users';
import Votes from './Votes';

export default class CannyAPI {
  apiBaseUrl = 'https://canny.io/api/v1';
  config: ICannyAPIConfig;
  private axios: AxiosInstance;

  boards: Boards;
  changelogEntries: ChangelogEntries;
  comments: Comments;
  companies: Companies;
  opportunities: Opportunities;
  posts: Posts;
  statusChanges: StatusChanges;
  tags: Tags;
  users: Users;
  votes: Votes;

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
    this.changelogEntries = new ChangelogEntries(this.axios);
    this.comments = new Comments(this.axios);
    this.companies = new Companies(this.axios);
    this.opportunities = new Opportunities(this.axios);
    this.posts = new Posts(this.axios);
    this.statusChanges = new StatusChanges(this.axios);
    this.tags = new Tags(this.axios);
    this.users = new Users(this.axios);
    this.votes = new Votes(this.axios);
  }
}
