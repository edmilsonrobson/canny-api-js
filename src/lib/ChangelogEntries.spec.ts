import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import ChangelogEntries, {
  ICannyChangelogEntryListResponse,
} from './ChangelogEntries';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios
  .onPost(ChangelogEntries.CHANGELOG_ENTRIES_LIST_ROUTE)
  .reply<ICannyChangelogEntryListResponse>(200, {
    hasMore: false,
    entries: [
      {
        id: '553c3ef8b8cdcd1501ba123b',
        created: '2018-08-31T00:00:00.000Z',
        labels: [
          {
            id: '553c3ef8b8cdcd1501ba8761',
            created: '2018-08-10T05:13:16.259Z',
            entryCount: 4,
            name: 'Feature',
            url: 'https://your-company.canny.io/admin/changelog?labels=feature',
          },
        ],
        lastSaved: '2019-05-31T00:00:00.000Z',
        markdownDetails: '# heading\n**bold**\n[link](https://canny.io)',
        plaintextDetails: 'heading\nbold\nlink',
        posts: [
          {
            category: {
              id: '553c3ef8b8cdcd1501ba2234',
              name: 'Dashboard',
              postCount: 42,
              url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
            },
            commentCount: 2,
            eta: 'February 2020',
            id: '553c3ef8b8cdcd1501ba4444',
            imageURLs: [],
            jira: {
              linkedIssues: [
                {
                  id: '123',
                  key: 'ID-123',
                  url: 'https://your-company.atlassian.net/browse/ID-123',
                },
              ],
            },
            score: 13,
            status: 'planned',
            tags: [
              {
                id: '553c3ef8b8cdcd1501ba3234',
                name: 'iOS',
                postCount: 15,
                url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
              },
            ],
            title: 'post-title',
            url: 'https://your-company.canny.io/admin/board/feature-requests/p/post-title',
          },
        ],
        publishedAt: '2019-05-31T00:00:00.000Z',
        scheduledFor: null,
        status: 'published',
        title: 'Entry title',
        types: ['new', 'improved'],
        url: 'https://your-company.canny.io/changelog/entry-title',
      },
    ],
  });

test('List must return an array of changelog entries', async (t) => {
  const expectedResponse: ICannyChangelogEntryListResponse = {
    hasMore: false,
    entries: [
      {
        id: '553c3ef8b8cdcd1501ba123b',
        created: '2018-08-31T00:00:00.000Z',
        labels: [
          {
            id: '553c3ef8b8cdcd1501ba8761',
            created: '2018-08-10T05:13:16.259Z',
            entryCount: 4,
            name: 'Feature',
            url: 'https://your-company.canny.io/admin/changelog?labels=feature',
          },
        ],
        lastSaved: '2019-05-31T00:00:00.000Z',
        markdownDetails: '# heading\n**bold**\n[link](https://canny.io)',
        plaintextDetails: 'heading\nbold\nlink',
        posts: [
          {
            category: {
              id: '553c3ef8b8cdcd1501ba2234',
              name: 'Dashboard',
              postCount: 42,
              url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
            },
            commentCount: 2,
            eta: 'February 2020',
            id: '553c3ef8b8cdcd1501ba4444',
            imageURLs: [],
            jira: {
              linkedIssues: [
                {
                  id: '123',
                  key: 'ID-123',
                  url: 'https://your-company.atlassian.net/browse/ID-123',
                },
              ],
            },
            score: 13,
            status: 'planned',
            tags: [
              {
                id: '553c3ef8b8cdcd1501ba3234',
                name: 'iOS',
                postCount: 15,
                url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
              },
            ],
            title: 'post-title',
            url: 'https://your-company.canny.io/admin/board/feature-requests/p/post-title',
          },
        ],
        publishedAt: '2019-05-31T00:00:00.000Z',
        scheduledFor: null,
        status: 'published',
        title: 'Entry title',
        types: ['new', 'improved'],
        url: 'https://your-company.canny.io/changelog/entry-title',
      },
    ],
  };

  const response = await cannyAPI.changelogEntries.list();

  t.deepEqual(response, expectedResponse);
});
