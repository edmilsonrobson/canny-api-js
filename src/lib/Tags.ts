import { AxiosInstance } from 'axios';

interface ICannyTagsListArgs {
  /** The id of the board you'd like to fetch tags for. */
  boardID: string;
  /** The number of tags you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The number of tags you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
}

export interface ICannyTagsListResponse {
  hasMore: boolean;
  tags: ICannyTag[];
}

interface ICannyTagsCreateArgs {
  /** The unique identifier of the board the tag should be created for. */
  boardID: string;
  /** The name of the tag. */
  name: string;
}

export default class Tags {
  static TAGS_RETRIEVE_ROUTE = '/tags/retrieve';
  static TAGS_LIST_ROUTE = '/tags/list';
  static TAGS_CREATE_ROUTE = '/tags/create';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async retrieve(id: string): Promise<ICannyTag> {
    const response = await this.axios.post<ICannyTag>(
      Tags.TAGS_RETRIEVE_ROUTE,
      {
        id,
      }
    );
    const { data } = response;

    return data;
  }

  async list(args?: ICannyTagsListArgs): Promise<ICannyTagsListResponse> {
    const response = await this.axios.post<ICannyTagsListResponse>(
      Tags.TAGS_LIST_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }

  async create(args: ICannyTagsCreateArgs): Promise<ICannyTag> {
    const response = await this.axios.post<ICannyTag>(
      Tags.TAGS_CREATE_ROUTE,
      args
    );
    const { data } = response;

    return data;
  }
}
