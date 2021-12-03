import { AxiosInstance } from 'axios';

export default class Users {
  static USERS_LIST_ROUTE = '/users/list';
  static USERS_RETRIEVE_ROUTE = '/users/retrieve';
  static USERS_FIND_OR_CREATE_ROUTE = '/users/find_or_create';
  static USERS_DELETE_ROUTE = '/users/delete';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(): Promise<ICannyUser[]> {
    const response = await this.axios.post(Users.USERS_LIST_ROUTE);
    const { data: users } = response;

    return users;
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
