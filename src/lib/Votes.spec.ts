import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Votes, { ICannyVotesListResponse } from './Votes';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios.onPost(Votes.VOTES_RETRIEVE_ROUTE).reply<ICannyVote>(200, {
  id: '553c3ef8b8cdcd1501ba123b',
  board: {
    created: '2017-08-30T13:32:01.000Z',
    id: '553c3ef8b8cdcd1501ba4400',
    name: 'Feature Requests',
    postCount: 99,
    url: 'https://your-company.canny.io/admin/board/feature-requests',
  },
  by: null,
  created: '2017-08-30T13:32:01.000Z',
  post: {
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
  voter: {
    id: '553c3ef8b8cdcd1501ba123a',
    created: '2017-08-30T13:32:00.000Z',
    email: 'test@test.test',
    isAdmin: false,
    name: 'Sally Doe',
    url: 'https://your-company.canny.io/admin/user/sally-doe',
    userID: '1234',
  },
});

mockedAxios.onPost(Votes.VOTES_LIST_ROUTE).reply<ICannyVotesListResponse>(200, {
  hasMore: false,
  votes: [
    {
      id: '553c3ef8b8cdcd1501ba123b',
      board: {
        created: '2017-07-10T11:22:00.000Z',
        id: '553c3ef8b8cdcd1501ba1234',
        name: 'Feature Requests',
        postCount: 123,
        url: 'https://your-company.canny.io/admin/board/feature-requests',
      },
      by: null,
      created: '2017-07-15T22:11:00.000Z',
      post: {
        category: {
          id: '553c3ef8b8cdcd1501ba2234',
          name: 'Dashboard',
          postCount: 42,
          url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
        },
        commentCount: 2,
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
      voter: {
        id: '553c3ef8b8cdcd1501ba123a',
        created: '2017-07-15T22:11:00.000Z',
        email: 'test@test.test',
        isAdmin: false,
        name: 'Sally Doe',
        url: 'https://your-company.canny.io/admin/user/sally-doe',
        userID: '1234',
      },
      zendeskTicket: {
        url: 'https://your-company.zendesk.com/api/v2/tickets/2.json',
        id: 2,
        created: '2018-12-14T19:20:25Z',
        subject: 'Ticket subject',
        description: 'Ticket description',
      },
    },
  ],
});

mockedAxios.onPost(Votes.VOTES_CREATE_ROUTE).reply<string>(200, 'success');

mockedAxios.onPost(Votes.VOTES_DELETE_ROUTE).reply<string>(200, 'success');

test('Retrieve must return a vote', async (t) => {
  const expectedResponse: ICannyVote = {
    id: '553c3ef8b8cdcd1501ba123b',
    board: {
      created: '2017-08-30T13:32:01.000Z',
      id: '553c3ef8b8cdcd1501ba4400',
      name: 'Feature Requests',
      postCount: 99,
      url: 'https://your-company.canny.io/admin/board/feature-requests',
    },
    by: null,
    created: '2017-08-30T13:32:01.000Z',
    post: {
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
    voter: {
      id: '553c3ef8b8cdcd1501ba123a',
      created: '2017-08-30T13:32:00.000Z',
      email: 'test@test.test',
      isAdmin: false,
      name: 'Sally Doe',
      url: 'https://your-company.canny.io/admin/user/sally-doe',
      userID: '1234',
    },
  };

  const response = await cannyAPI.votes.retrieve('553c3ef8b8cdcd1501ba123b');

  t.deepEqual(response, expectedResponse);
});

test('List must return a list of votes', async (t) => {
  const expectedResponse: ICannyVotesListResponse = {
    hasMore: false,
    votes: [
      {
        id: '553c3ef8b8cdcd1501ba123b',
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        by: null,
        created: '2017-07-15T22:11:00.000Z',
        post: {
          category: {
            id: '553c3ef8b8cdcd1501ba2234',
            name: 'Dashboard',
            postCount: 42,
            url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
          },
          commentCount: 2,
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
        voter: {
          id: '553c3ef8b8cdcd1501ba123a',
          created: '2017-07-15T22:11:00.000Z',
          email: 'test@test.test',
          isAdmin: false,
          name: 'Sally Doe',
          url: 'https://your-company.canny.io/admin/user/sally-doe',
          userID: '1234',
        },
        zendeskTicket: {
          url: 'https://your-company.zendesk.com/api/v2/tickets/2.json',
          id: 2,
          created: '2018-12-14T19:20:25Z',
          subject: 'Ticket subject',
          description: 'Ticket description',
        },
      },
    ],
  };

  const response = await cannyAPI.votes.list();

  t.deepEqual(response, expectedResponse);
});

test('Create must return true', async (t) => {
  const expectedResponse = true;

  const response = await cannyAPI.votes.create({
    postID: 'post-id',
    voterID: 'voter-id',
  });

  t.deepEqual(response, expectedResponse);
});

test('Delete must return true', async (t) => {
  const expectedResponse = true;

  const response = await cannyAPI.votes.delete({
    postID: 'post-id',
    voterID: 'voter-id',
  });

  t.deepEqual(response, expectedResponse);
});
