import { AxiosInstance } from 'axios';

interface ICannyVotesListArgs {
  /** The id of the board you'd like to fetch votes for. */
  boardID?: string;
  /** The number of votes you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** Specify a postID to only fetch votes for a specific post. */
  postID?: string;
  /** The number of votes you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
  /** Specify a userID to only fetch votes for a specific user. */
  userID?: string;
}

interface ICannyVotesListResponse {
  hasMore: boolean;
  votes: ICannyTag[];
}

interface ICannyVotesCreateArgs {
  /** The unique identifier of the post to vote on. */
  postID: string;
  /** The unique identifier of the voter (The `id` of an `User`). */
  voterID: string;
}

interface ICannyVotesDeleteArgs {
  /** The unique identifier of the post to vote on. */
  postID: string;
  /** The unique identifier of the voter (The `id` of an `User`). */
  voterID: string;
}

export default class Votes {
  static VOTES_RETRIEVE_ROUTE = '/votes/retrieve';
  static VOTES_LIST_ROUTE = '/votes/list';
  static VOTES_CREATE_ROUTE = '/votes/create';
  static VOTES_DELETE_ROUTE = '/votes/delete';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async retrieve(id: string): Promise<ICannyVote> {
    const response = await this.axios.post<ICannyVote>(
      Votes.VOTES_RETRIEVE_ROUTE,
      {
        id,
      }
    );
    const { data } = response;

    return data;
  }

  async list(args?: ICannyVotesListArgs): Promise<ICannyVotesListResponse> {
    const response = await this.axios.post<ICannyVotesListResponse>(
      Votes.VOTES_LIST_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }

  async create(args: ICannyVotesCreateArgs): Promise<boolean> {
    const response = await this.axios.post<string>(
      Votes.VOTES_CREATE_ROUTE,
      args
    );
    const { data } = response;

    return data === 'success';
  }

  async delete(args: ICannyVotesDeleteArgs): Promise<boolean> {
    const response = await this.axios.post<string>(
      Votes.VOTES_DELETE_ROUTE,
      args
    );
    const { data } = response;

    return data === 'success';
  }
}
