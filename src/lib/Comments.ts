import { AxiosInstance } from 'axios';

interface ICannyCommentListArgs {
  /** The id of the author you'd like to fetch comments for. */
  authorID?: string;
  /** The id of the board you'd like to fetch comments for. */
  boardID?: string;
  /** The number of comments you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The id of the post you'd like to fetch comments for. */
  postID?: string;
  /** The number of comments you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
}

interface ICannyCommentListResponse {
  hasMore: boolean;
  comments: ICannyComment[];
}

interface ICannyCommentCreateArgs {
  /** The unique identifier of the comment's author. */
  authorID: string;
  /** The unique identifier of the comment's post. */
  postID: string;
  /** The comment value. */
  value: string;
  /** An array of the URLs of comment's images. */
  imageURLs?: string[];
  /** Whether this comment is only available for internal usage. Default is false. */
  internal?: boolean;
  /** The unique identifier of the comment's parent, if this comment is a reply. */
  parentID?: string;
  /** Whether this comment should be allowed to trigger email notifications. Default is false. */
  shouldNotifyVoters?: boolean;
}

interface ICannyCommentCreateResponse {
  id: string;
}

interface ICannyCommentDeleteArgs {
  commentID: string;
}

export default class Comments {
  static COMMENTS_RETRIEVE_ROUTE = '/comments/retrieve';
  static COMMENTS_LIST_ROUTE = '/comments/list';
  static COMMENTS_CREATE_ROUTE = '/comments/create';
  static COMMENTS_DELETE_ROUTE = '/comments/delete';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async retrieve(id: string): Promise<ICannyComment> {
    const response = await this.axios.post<ICannyComment>(
      Comments.COMMENTS_RETRIEVE_ROUTE,
      {
        id,
      }
    );
    const { data } = response;

    return data;
  }

  async list(args?: ICannyCommentListArgs): Promise<ICannyCommentListResponse> {
    const response = await this.axios.post<ICannyCommentListResponse>(
      Comments.COMMENTS_LIST_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }

  async create(
    args: ICannyCommentCreateArgs
  ): Promise<ICannyCommentCreateResponse> {
    const response = await this.axios.post<ICannyCommentCreateResponse>(
      Comments.COMMENTS_CREATE_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }

  async delete(args: ICannyCommentDeleteArgs | string): Promise<string> {
    const parsedArgs = typeof args === 'string' ? { commentID: args } : args;
    const response = await this.axios.post<string>(
      Comments.COMMENTS_DELETE_ROUTE,
      parsedArgs
    );
    const { data } = response;

    return data;
  }
}
