import { AxiosInstance } from 'axios';

interface ICannyChangelogEntryListResponse {
  hasMore: boolean;
  entries: ICannyChangelogEntry[];
}

interface ICannyChangelogEntryListArgs {
  /** Fetch only entries with at least one of the labels in the array. */
  labelIDs?: string[];
  limit?: number;
  skip?: number;
  sort?: CannyChangelogEntrySortOptions;
  type?: CannyChangelogEntryType;
}

export default class ChangelogEntries {
  static CHANGELOG_ENTRIES_LIST_ROUTE = '/entries/list';

  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async list(
    args?: ICannyChangelogEntryListArgs
  ): Promise<ICannyChangelogEntryListResponse> {
    const response = await this.axios.post(
      ChangelogEntries.CHANGELOG_ENTRIES_LIST_ROUTE,
      { ...args }
    );
    const { data } = response;

    return data;
  }
}
