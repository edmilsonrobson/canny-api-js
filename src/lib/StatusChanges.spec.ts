import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import StatusChanges, { ICannyStatusChangeListResponse } from './StatusChanges';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios
  .onPost(StatusChanges.STATUS_CHANGES_LIST_ROUTE)
  .reply<ICannyStatusChangeListResponse>(200, {
    hasMore: false,
    statusChanges: [
      {
        changeComment: {
          imageURLs: [
            'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
            'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
          ],
          value: 'The status has changed!',
        },
        changer: {
          id: '553c3ef8b8cdcd1501ba123a',
          created: '2017-07-15T22:11:00.000Z',
          email: 'test@test.test',
          isAdmin: false,
          name: 'Sally Doe',
          url: 'https://your-company.canny.io/admin/user/sally-doe',
          userID: '1234',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba12bb',
        post: {
          id: '553c3ef8b8cdcd1501ba1238',
          author: {
            id: '553c3ef8b8cdcd1501ba123a',
            created: '2017-07-15T22:11:00.000Z',
            email: 'test@test.test',
            isAdmin: false,
            name: 'Sally Doe',
            url: 'https://your-company.canny.io/admin/user/sally-doe',
            userID: '1234',
          },
          board: {
            created: '2017-07-10T11:22:00.000Z',
            id: '553c3ef8b8cdcd1501ba1234',
            name: 'Feature Requests',
            postCount: 123,
            url: 'https://your-company.canny.io/admin/board/feature-requests',
          },
          category: {
            id: '553c3ef8b8cdcd1501ba2234',
            name: 'Dashboard',
            postCount: 42,
            url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
          },
          changeComment: {
            value: 'The status has changed!',
            imageURLs: [
              'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b2.png',
            ],
          },
          commentCount: 10,
          created: '2017-08-22T13:32:00.000Z',
          details: 'Test post details',
          eta: 'February 2020',
          imageURLs: [
            'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
            'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
          ],
          jira: {
            linkedIssues: [
              {
                id: '123',
                key: 'ID-123',
                url: 'https://your-company.atlassian.net/browse/ID-123',
              },
            ],
          },
          score: 72,
          status: 'in progress',
          statusChangedAt: '2017-08-24T23:22:00.000Z',
          tags: [
            {
              id: '553c3ef8b8cdcd1501ba3234',
              name: 'iOS',
              postCount: 15,
              url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
            },
          ],
          title: 'An awesome feature request',
          url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
        },
        status: 'in progress',
      },
    ],
  });

test('List must return an array of status changes', async (t) => {
  const expectedResponse: ICannyStatusChangeListResponse = {
    hasMore: false,
    statusChanges: [
      {
        changeComment: {
          imageURLs: [
            'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
            'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
          ],
          value: 'The status has changed!',
        },
        changer: {
          id: '553c3ef8b8cdcd1501ba123a',
          created: '2017-07-15T22:11:00.000Z',
          email: 'test@test.test',
          isAdmin: false,
          name: 'Sally Doe',
          url: 'https://your-company.canny.io/admin/user/sally-doe',
          userID: '1234',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba12bb',
        post: {
          id: '553c3ef8b8cdcd1501ba1238',
          author: {
            id: '553c3ef8b8cdcd1501ba123a',
            created: '2017-07-15T22:11:00.000Z',
            email: 'test@test.test',
            isAdmin: false,
            name: 'Sally Doe',
            url: 'https://your-company.canny.io/admin/user/sally-doe',
            userID: '1234',
          },
          board: {
            created: '2017-07-10T11:22:00.000Z',
            id: '553c3ef8b8cdcd1501ba1234',
            name: 'Feature Requests',
            postCount: 123,
            url: 'https://your-company.canny.io/admin/board/feature-requests',
          },
          category: {
            id: '553c3ef8b8cdcd1501ba2234',
            name: 'Dashboard',
            postCount: 42,
            url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
          },
          changeComment: {
            value: 'The status has changed!',
            imageURLs: [
              'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b2.png',
            ],
          },
          commentCount: 10,
          created: '2017-08-22T13:32:00.000Z',
          details: 'Test post details',
          eta: 'February 2020',
          imageURLs: [
            'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
            'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
          ],
          jira: {
            linkedIssues: [
              {
                id: '123',
                key: 'ID-123',
                url: 'https://your-company.atlassian.net/browse/ID-123',
              },
            ],
          },
          score: 72,
          status: 'in progress',
          statusChangedAt: '2017-08-24T23:22:00.000Z',
          tags: [
            {
              id: '553c3ef8b8cdcd1501ba3234',
              name: 'iOS',
              postCount: 15,
              url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
            },
          ],
          title: 'An awesome feature request',
          url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
        },
        status: 'in progress',
      },
    ],
  };

  const response = await cannyAPI.statusChanges.list();

  t.deepEqual(response, expectedResponse);
});
