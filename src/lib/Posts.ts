import { AxiosInstance } from 'axios';
import { sleep } from './helpers';

interface ICannyPostListResponse {
  hasMore: boolean;
  posts: ICannyPost[];
}

interface ICannyPostListArgs {
  /** The id of the board you'd like to fetch posts for. */
  boardID?: string;
  /** If specified, will only fetch posts by the author with this id. */
  authorID?: string;
  /** If specified, will only fetch posts tagged with at least one of the tags in the array. */
  tagIDs?: string[];
  /** The number of posts you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** If specified, will only fetch posts that match your search query. */
  search?: string;
  /** The number of posts you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
  /** The order in which the posts should be fetched. Options include: "newest", "oldest", "relevance", "score", "statusChanged", "trending". Defaults to "newest" if not specified. The "relevance" sort can only be specified if a search value has been specified. */
  sort?: CannyPostSortOptions;
  /** A comma separated list of statuses. Only posts with these statuses will be fetched. Defaults to "open,under review,planned,in progress" if not specified. */
  status?: CannyPostStatus;
}

interface ICannyPostCreateArgs {
  /** The unique identifier of the post's author. (Note: this is the `id` of the User on Canny, not the `userId`!) */
  authorID: string;
  /** The unique identifier of the post's board. */
  boardID: string;
  /** The identifier of the admin who creates the post on behalf of the author. This will be visible in the post. */
  byID?: string;
  /** The unique identifier of the post's category. */
  categoryID?: string;
  /** The post details. */
  details: string;
  /** The post title. */
  title: string;
  /** An array of the URLs of post's images. */
  imageURLs?: string[];
}

interface ICannyPostCreateResponse {
  id: string;
}

interface ICannyPostChangeStatusArgs {
  /** The identifier of the admin to record as having changed the post's status. This will be visible in the post's activity section. */
  changerID: string;
  /** The post's unique identifier. */
  postID: string;
  /** Whether or not to notify non-admin voters of the status change. */
  shouldNotifyVoters: boolean;
  /** The status to change the post to. Options include: "open", "under review", "planned", "in progress", "complete", "closed", or any other status your team has set on the settings page. */
  status: CannyPostStatus;
}

interface ICannyAddOrRemoveTagArgs {
  postID: string;
  tagID: string;
}

export default class Posts {
  static POSTS_RETRIEVE_ROUTE = '/posts/retrieve';
  static POSTS_LIST_ROUTE = '/posts/list';
  static POSTS_CREATE_ROUTE = '/posts/create';
  static POSTS_CHANGE_STATUS_ROUTE = '/posts/change_status';
  static POSTS_ADD_TAG_ROUTE = '/posts/add_tag';
  static POSTS_REMOVE_TAG_ROUTE = '/posts/remove_tag';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async retrieve(id: string): Promise<ICannyPost> {
    const response = await this.axios.post(Posts.POSTS_RETRIEVE_ROUTE, { id });
    const { data } = response;

    return data;
  }

  async list(args?: ICannyPostListArgs): Promise<ICannyPostListResponse> {
    const response = await this.axios.post(Posts.POSTS_LIST_ROUTE, { ...args });
    const { data } = response;

    return data;
  }

  async listAll(args?: ICannyPostListArgs): Promise<ICannyPost[]> {
    delete args.limit;
    delete args.skip;
    const limit = 100;

    const posts: ICannyPost[] = [];
    let currentSkipCount = 0;
    const getPage = async (): Promise<ICannyPostListResponse> => {
      return this.list({
        ...args,
        limit: limit,
        skip: currentSkipCount,
      });
    };

    let page;
    do {
      page = await getPage();
      posts.push(...page.posts);
      currentSkipCount += limit;
      await sleep(2000);
    } while (page.hasMore);

    return posts;
  }

  async create(args: ICannyPostCreateArgs): Promise<ICannyPostCreateResponse> {
    const response = await this.axios.post(Posts.POSTS_CREATE_ROUTE, {
      ...args,
    });
    const { data } = response;

    return data;
  }

  async changePostStatus(
    args: ICannyPostChangeStatusArgs
  ): Promise<ICannyPost> {
    const response = await this.axios.post(
      Posts.POSTS_CHANGE_STATUS_ROUTE,
      args
    );
    const { data } = response;
    return data;
  }

  async addTag(args: ICannyAddOrRemoveTagArgs): Promise<ICannyPost> {
    const response = await this.axios.post(Posts.POSTS_ADD_TAG_ROUTE, args);
    const { data } = response;
    return data;
  }

  async removeTag(args: ICannyAddOrRemoveTagArgs): Promise<ICannyPost> {
    const response = await this.axios.post(Posts.POSTS_REMOVE_TAG_ROUTE, args);
    const { data } = response;
    return data;
  }
}
