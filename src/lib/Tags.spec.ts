import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Tags, { ICannyTagsListResponse } from './Tags';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios.onPost(Tags.TAGS_RETRIEVE_ROUTE).reply<ICannyTag>(200, {
  id: '553c3ef8b8cdcd1501ba12bb',
  board: {
    created: '2017-08-30T13:32:01.000Z',
    id: '553c3ef8b8cdcd1501ba4400',
    name: 'Feature Requests',
    postCount: 99,
    url: 'https://your-company.canny.io/admin/board/feature-requests',
  },
  created: '2017-08-30T13:32:01.000Z',
  name: 'Example Tag Name',
  postCount: 12,
  url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
});

mockedAxios.onPost(Tags.TAGS_LIST_ROUTE).reply<ICannyTagsListResponse>(200, {
  hasMore: false,
  tags: [
    {
      id: '553c3ef8b8cdcd1501ba12bb',
      board: {
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba4400',
        name: 'Feature Requests',
        postCount: 99,
        url: 'https://your-company.canny.io/admin/board/feature-requests',
      },
      created: '2017-08-30T13:32:01.000Z',
      name: 'Example Tag Name',
      postCount: 12,
      url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
    },
  ],
});

mockedAxios.onPost(Tags.TAGS_CREATE_ROUTE).reply<ICannyTag>(200, {
  id: '553c3ef8b8cdcd1501ba12bb',
  board: {
    created: '2017-08-30T13:32:01.000Z',
    id: '553c3ef8b8cdcd1501ba4400',
    name: 'Feature Requests',
    postCount: 99,
    url: 'https://your-company.canny.io/admin/board/feature-requests',
  },
  created: '2017-08-30T13:32:01.000Z',
  name: 'Example Tag Name',
  postCount: 12,
  url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
});

test('Retrieve must return a tag', async (t) => {
  const expectedResponse: ICannyTag = {
    id: '553c3ef8b8cdcd1501ba12bb',
    board: {
      created: '2017-08-30T13:32:01.000Z',
      id: '553c3ef8b8cdcd1501ba4400',
      name: 'Feature Requests',
      postCount: 99,
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
    created: '2017-08-30T13:32:01.000Z',
    name: 'Example Tag Name',
    postCount: 12,
    url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
  };

  const response = await cannyAPI.tags.retrieve('553c3ef8b8cdcd1501ba12bb');

  t.deepEqual(response, expectedResponse);
});

test('List must return a list of tags', async (t) => {
  const expectedResponse: ICannyTagsListResponse = {
    hasMore: false,
    tags: [
      {
        id: '553c3ef8b8cdcd1501ba12bb',
        board: {
          created: '2017-08-30T13:32:01.000Z',
          id: '553c3ef8b8cdcd1501ba4400',
          name: 'Feature Requests',
          postCount: 99,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-08-30T13:32:01.000Z',
        name: 'Example Tag Name',
        postCount: 12,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
      },
    ],
  };

  const response = await cannyAPI.tags.list();

  t.deepEqual(response, expectedResponse);
});

test('Create must return the created tag', async (t) => {
  const expectedResponse: ICannyTag = {
    id: '553c3ef8b8cdcd1501ba12bb',
    board: {
      created: '2017-08-30T13:32:01.000Z',
      id: '553c3ef8b8cdcd1501ba4400',
      name: 'Feature Requests',
      postCount: 99,
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
    created: '2017-08-30T13:32:01.000Z',
    name: 'Example Tag Name',
    postCount: 12,
    url: 'https://your-company.canny.io/admin/board/feature-requests?tag=example-tag-name',
  };

  const response = await cannyAPI.tags.create({
    boardID: 'my-board-id',
    name: 'tag name',
  });

  t.deepEqual(response, expectedResponse);
});
