import { AxiosInstance } from 'axios';

export default class Companies {
  static COMPANIES_DELETE_ROUTE = '/companies/delete';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async delete(companyID: string): Promise<string> {
    const response = await this.axios.post(Companies.COMPANIES_DELETE_ROUTE, {
      companyID,
    });
    const { data: board } = response;

    return board;
  }
}
