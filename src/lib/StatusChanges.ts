import { AxiosInstance } from 'axios';

interface ICannyStatusChangeListArgs {
  /** The id of the board you'd like to fetch status changes for. */
  boardID?: string;
  /** The number of status changes you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The number of status changes you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
}

interface ICannyStatusChangeListResponse {
  hasMore: boolean;
  statusChanges: ICannyStatusChange[];
}

export default class StatusChanges {
  static STATUS_CHANGES_LIST_ROUTE = '/status_changes/list';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(
    args?: ICannyStatusChangeListArgs
  ): Promise<ICannyStatusChangeListResponse> {
    const response = await this.axios.post<ICannyStatusChangeListResponse>(
      StatusChanges.STATUS_CHANGES_LIST_ROUTE,
      {
        ...args,
      }
    );
    const { data } = response;

    return data;
  }
}
