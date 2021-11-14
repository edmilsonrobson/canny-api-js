import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import Boards from './Boards';
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
      id: 'my-first-board-id',
      created: '2017-07-15T22:11:00.000Z',
      name: 'My First Board',
      postCount: 132,
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
  ] as ICannyBoard[],
});

mockedAxios.onPost(Boards.BOARDS_RETRIEVE_ROUTE).reply(200, {
  id: 'my-first-board-id',
  created: '2017-07-15T22:11:00.000Z',
  name: 'My First Board',
  postCount: 132,
  url: 'https://your-company.canny.io/admin/board/feature-requests',
} as ICannyBoard);

test('List must return an array of boards', async (t) => {
  const expectedBoards: ICannyBoard[] = [
    {
      id: 'my-first-board-id',
      created: '2017-07-15T22:11:00.000Z',
      name: 'My First Board',
      postCount: 132,
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
  ];

  const boards = await cannyAPI.boards.list();

  t.deepEqual(boards, expectedBoards);
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
