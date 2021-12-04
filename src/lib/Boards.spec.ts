import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import Boards, { ICannyBoardListResponse } from './Boards';
import CannyAPI from './CannyAPI';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios.onPost(Boards.BOARDS_LIST_ROUTE).reply(200, {
  boards: [
    {
      id: '553c3ef8b8cdcd1501ba1234',
      created: '2017-07-15T22:11:00.000Z',
      isPrivate: true,
      name: 'Feature Requests',
      postCount: 123,
      token: '11111111-2222-3333-4444-555555555555',
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
    {
      id: '553c3ef8b8cdcd1501ba1238',
      created: '2017-07-15T22:11:00.000Z',
      isPrivate: false,
      name: 'Bug Reports',
      postCount: 42,
      token: '11111111-2222-3333-4444-555555555555',
      url: 'https://your-company.canny.io/admin/board/bug-reports',
    },
  ],
});

mockedAxios.onPost(Boards.BOARDS_RETRIEVE_ROUTE).reply(200, {
  id: 'my-first-board-id',
  created: '2017-07-15T22:11:00.000Z',
  name: 'My First Board',
  postCount: 132,
  url: 'https://your-company.canny.io/admin/board/feature-requests',
} as ICannyBoard);

test('List must return an array of boards', async (t) => {
  const expectedResponse: ICannyBoardListResponse = {
    boards: [
      {
        id: '553c3ef8b8cdcd1501ba1234',
        created: '2017-07-15T22:11:00.000Z',
        isPrivate: true,
        name: 'Feature Requests',
        postCount: 123,
        token: '11111111-2222-3333-4444-555555555555',
        url: 'https://your-company.canny.io/admin/board/feature-requests',
      },
      {
        id: '553c3ef8b8cdcd1501ba1238',
        created: '2017-07-15T22:11:00.000Z',
        isPrivate: false,
        name: 'Bug Reports',
        postCount: 42,
        token: '11111111-2222-3333-4444-555555555555',
        url: 'https://your-company.canny.io/admin/board/bug-reports',
      },
    ],
  };

  const response = await cannyAPI.boards.list();

  t.deepEqual(response, expectedResponse);
});

test('Retrieve must return a board', async (t) => {
  const expectedBoard: ICannyBoard = {
    id: 'my-first-board-id',
    created: '2017-07-15T22:11:00.000Z',
    name: 'My First Board',
    postCount: 132,
    url: 'https://your-company.canny.io/admin/board/feature-requests',
  };

  const board = await cannyAPI.boards.retrieve('my-first-board-id');

  t.deepEqual(board, expectedBoard);
});
