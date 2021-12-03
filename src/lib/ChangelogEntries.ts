import { AxiosInstance } from 'axios';

interface ICannyChangelogEntryListResponse {
  hasMore: boolean;
  entries: ICannyChangelogEntry[];
}

interface ICannyChangelogEntryListArgs {
  /** Fetch only entries with at least one of the labels in the array. */
  labelIDs?: string[];
  /** The number of entries you'd like to fetch. Defaults to 10 if not specified. */
  limit?: number;
  /** The number of entries you'd like to skip before starting to fetch. Defaults to 0 if not specified. */
  skip?: number;
  /** The order in which the entries should be fetched. Options include: "created", "lastSaved", "nonPublishedFirst", "publishedAt". Defaults to "nonPublishedFirst" if not specified. */
  sort?: CannyChangelogEntrySortOptions;
  /** The type of entries to fetch. Value can be "new", "improved", or "fixed". */
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
