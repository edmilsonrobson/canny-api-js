import { AxiosInstance } from 'axios';

export default class Users {
  static USERS_LIST_ROUTE = '/users/list';

  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(): Promise<ICannyUser[]> {
    const response = await this.axios.post(Users.USERS_LIST_ROUTE);
    const {
      data: { users },
    } = response;

    return users;
  }
}
