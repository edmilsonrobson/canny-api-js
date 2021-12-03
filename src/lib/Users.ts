import { AxiosInstance } from 'axios';

interface ICannyUserListArgs {
  /** The number of entries you'd like to fetch. Defaults to 10 if not specified. Maximum value allowed: 100. */
  limit?: number;
  /** The number of entries you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
}

interface ICannyUserListResponse {
  hasMore: boolean;
  users: ICannyUser[];
}

interface ICannyUserFindOrCreateArgs {
  /** The URL pointing to the user's avatar image. */
  avatarURL?: string;
  /** A list of companies the user is associated with. */
  companies?: ICannyUserCompanyCreateArg[];
  /** The date the user was created in your system. */
  created?: string;
  /** Any custom fields associated with the user. */
  customFields?: ICannyCustomFields;
  /** The user's email. */
  email?: string;
  /** The user's name. */
  name: string;
  /** The user's unique identifier in your application. */
  userID: string;
}

interface ICannyUserFindOrCreateResponse {
  id: string;
}

export default class Users {
  static USERS_LIST_ROUTE = '/users/list';
  static USERS_RETRIEVE_ROUTE = '/users/retrieve';
  static USERS_FIND_OR_CREATE_ROUTE = '/users/find_or_create';
  static USERS_DELETE_ROUTE = '/users/delete';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(args?: ICannyUserListArgs): Promise<ICannyUserListResponse> {
    const response = await this.axios.post(Users.USERS_LIST_ROUTE, { ...args });
    const { data } = response;

    return data;
  }

  async retrieve(id: string): Promise<ICannyUser> {
    const response = await this.axios.post(Users.USERS_RETRIEVE_ROUTE, {
      id,
    });
    const { data: users } = response;

    return users;
  }

  async findOrCreate(
    args: ICannyUserFindOrCreateArgs
  ): Promise<ICannyUserFindOrCreateResponse> {
    const response = await this.axios.post(
      Users.USERS_FIND_OR_CREATE_ROUTE,
      args
    );
    return response.data;
  }

  async delete(id: string) {
    const response = await this.axios.post(Users.USERS_DELETE_ROUTE, { id });
    return response.data;
  }
}
