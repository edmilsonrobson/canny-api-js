import { AxiosInstance } from 'axios';

interface ICannyOpportunitiesListArg {
  /** The number of opportunities you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The number of opportunities you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
}

export interface ICannyOpportunitiesListResponse {
  hasMore: boolean;
  opportunities: ICannyOpportunity[];
}

export default class Opportunities {
  static OPPORTUNITIES_LIST_ROUTE = '/opportunities/list';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(
    args?: ICannyOpportunitiesListArg
  ): Promise<ICannyOpportunitiesListResponse> {
    const response = await this.axios.post<ICannyOpportunitiesListResponse>(
      Opportunities.OPPORTUNITIES_LIST_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }
}
