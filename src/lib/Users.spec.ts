import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Users, { ICannyUserFindOrCreateResponse } from './Users';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios.onPost(Users.USERS_RETRIEVE_ROUTE).reply<ICannyUser>(200, {
  id: '553c3ef8b8cdcd1501ba123a',
  avatarURL: 'https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg',
  created: '2021-12-08T03:18:03.362Z',
  email: 'test@test.test',
  isAdmin: false,
  lastActivity: '2021-12-08T03:18:03.362Z',
  name: 'Sally Doe',
  url: 'https://your-company.canny.io/admin/user/sally-doe',
  userID: '1234',
});

mockedAxios.onPost(Users.USERS_LIST_ROUTE).reply<ICannyUser[]>(200, [
  {
    id: '553c3ef8b8cdcd1501ba123a',
    avatarURL: 'https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg',
    created: '2021-12-08T03:18:57.452Z',
    email: 'test@test.test',
    isAdmin: false,
    lastActivity: '2021-12-08T03:18:57.452Z',
    name: 'Sally Doe',
    url: 'https://your-company.canny.io/admin/user/sally-doe',
    userID: '1234',
  },
]);

mockedAxios
  .onPost(Users.USERS_FIND_OR_CREATE_ROUTE)
  .reply<ICannyUserFindOrCreateResponse>(200, {
    id: '553c3ef8b8cdcd1501ba123a',
  });

mockedAxios.onPost(Users.USERS_DELETE_ROUTE).reply<string>(200, 'success');

test('Retrieve must return a user', async (t) => {
  const expectedResponse: ICannyUser = {
    id: '553c3ef8b8cdcd1501ba123a',
    avatarURL: 'https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg',
    created: '2021-12-08T03:18:03.362Z',
    email: 'test@test.test',
    isAdmin: false,
    lastActivity: '2021-12-08T03:18:03.362Z',
    name: 'Sally Doe',
    url: 'https://your-company.canny.io/admin/user/sally-doe',
    userID: '1234',
  };

  const response = await cannyAPI.users.retrieve('553c3ef8b8cdcd1501ba123a');

  t.deepEqual(response, expectedResponse);
});

test('List must return a list of users', async (t) => {
  const expectedResponse: ICannyUser[] = [
    {
      id: '553c3ef8b8cdcd1501ba123a',
      avatarURL: 'https://canny.io/images/a3db0133d1e7d9122832b67b2c4caaaa.jpg',
      created: '2021-12-08T03:18:57.452Z',
      email: 'test@test.test',
      isAdmin: false,
      lastActivity: '2021-12-08T03:18:57.452Z',
      name: 'Sally Doe',
      url: 'https://your-company.canny.io/admin/user/sally-doe',
      userID: '1234',
    },
  ];

  const response = await cannyAPI.users.list();

  t.deepEqual(response, expectedResponse);
});

test('Find or create user must return id of created or edited user', async (t) => {
  const expectedResponse: ICannyUserFindOrCreateResponse = {
    id: '553c3ef8b8cdcd1501ba123a',
  };

  const response = await cannyAPI.users.findOrCreate({
    name: 'Joseph Joestar',
    userID: 'user-id',
  });

  t.deepEqual(response, expectedResponse);
});

test('Delete must return success', async (t) => {
  const expectedResponse = 'success';

  const response = await cannyAPI.users.delete('553c3ef8b8cdcd1501ba2200');

  t.deepEqual(response, expectedResponse);
});
