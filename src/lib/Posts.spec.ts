import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Posts, {
  ICannyPostCreateResponse,
  ICannyPostListResponse,
} from './Posts';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios.onPost(Posts.POSTS_RETRIEVE_ROUTE).reply<ICannyPost>(200, {
  id: '553c3ef8b8cdcd1501ba1238',
  author: {
    id: '553c3ef8b8cdcd1501ba123a',
    created: '2017-07-15T22:11:00.000Z',
    email: 'test@test.test',
    isAdmin: true,
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
  by: {
    id: '524c3ef8b8cdcd1501ba246b',
    created: '2017-07-15T22:11:00.000Z',
    email: 'test@john.test',
    isAdmin: true,
    name: 'John Doe',
    url: 'https://your-company.canny.io/admin/user/john-doe',
    userID: '5678',
  },
  category: {
    id: '553c3ef8b8cdcd1501ba2234',
    name: 'Dashboard',
    postCount: 42,
    url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
  },
  changeComment: {
    value: 'The status has changed!',
    imageURLs: ['https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b2.png'],
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
  mergeHistory: [
    {
      created: '2018-06-17T22:42:37.167Z',
      post: {
        created: '2018-06-17T22:42:00.797Z',
        details: 'Awesome feature post details',
        id: '553c3ef8b8cdcd1501ba6789',
        imageURLs: [],
        title: 'Another awesome feature request',
      },
    },
  ],
  owner: {
    id: '553c3ef8b8cdcd1501ba123a',
    created: '2017-07-15T22:11:00.000Z',
    email: 'test@test.test',
    isAdmin: true,
    name: 'Sally Doe',
    url: 'https://your-company.canny.io/admin/user/sally-doe',
    userID: '1234',
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
});

mockedAxios.onPost(Posts.POSTS_LIST_ROUTE).reply<ICannyPostListResponse>(200, {
  hasMore: true,
  posts: [
    {
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
        created: '2017-07-15T22:11:00.000Z',
        id: '553c3ef8b8cdcd1501ba1234',
        name: 'Feature Requests',
        postCount: 123,
        url: 'https://your-company.canny.io/admin/board/feature-requests',
      },
      by: {
        id: '524c3ef8b8cdcd1501ba246b',
        created: '2017-07-15T22:11:00.000Z',
        email: 'test@john.test',
        isAdmin: true,
        name: 'John Doe',
        url: 'https://your-company.canny.io/admin/user/john-doe',
        userID: '5678',
      },
      category: {
        id: '553c3ef8b8cdcd1501ba2234',
        name: 'Dashboard',
        postCount: 42,
        url: 'https://your-company.canny.io/admin/board/feature-requests?category=dashboard',
      },
      commentCount: 10,
      created: '2017-07-15T22:11:00.000Z',
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
      mergeHistory: [
        {
          created: '2018-06-17T22:42:37.167Z',
          post: {
            created: '2018-06-17T22:42:00.797Z',
            details: 'Awesome feature post details',
            id: '553c3ef8b8cdcd1501ba6789',
            imageURLs: [],
            title: 'Another awesome feature request',
          },
        },
      ],
      owner: {
        id: '553c3ef8b8cdcd1501ba123a',
        created: '2017-07-15T22:11:00.000Z',
        email: 'test@test.test',
        isAdmin: true,
        name: 'Sally Doe',
        url: 'https://your-company.canny.io/admin/user/sally-doe',
        userID: '1234',
      },
      score: 72,
      status: 'in progress',
      statusChangedAt: '2017-07-15T23:22:00.000Z',
      tags: [
        {
          id: '553c3ef8b8cdcd1501ba3234',
          name: 'iOS',
          postCount: 15,
          url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
        },
      ],
      title: 'An awesome feature request',
      url: 'https://your-company.canny.io/admin/board/feature-requests/p/post-title',
    },
  ],
});

mockedAxios
  .onPost(Posts.POSTS_CREATE_ROUTE)
  .reply<ICannyPostCreateResponse>(200, {
    id: '553c3ef8b8cdcd1501ba1240',
  });

mockedAxios
  .onPost(Posts.POSTS_CHANGE_STATUS_ROUTE)
  .reply<ICannyPostChangeResponse>(200, {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
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
  });

mockedAxios
  .onPost(Posts.POSTS_ADD_TAG_ROUTE)
  .reply<ICannyPostChangeResponse>(200, {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
    score: 72,
    status: 'in progress',
    statusChangedAt: '2017-08-24T23:22:00.000Z',
    tags: [
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba3234',
        name: 'iOS',
        postCount: 15,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
      },
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2018-04-20T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba12bb',
        name: 'Example Tag',
        postCount: 12,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=example-tag',
      },
    ],
    title: 'An awesome feature request',
    url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
  });

mockedAxios
  .onPost(Posts.POSTS_REMOVE_TAG_ROUTE)
  .reply<ICannyPostChangeResponse>(200, {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
    score: 72,
    status: 'in progress',
    statusChangedAt: '2017-08-24T23:22:00.000Z',
    tags: [
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba3234',
        name: 'iOS',
        postCount: 15,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
      },
    ],
    title: 'An awesome feature request',
    url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
  });

test('Retrieve must return a post', async (t) => {
  const expectedResponse: ICannyPost = {
    id: '553c3ef8b8cdcd1501ba1238',
    author: {
      id: '553c3ef8b8cdcd1501ba123a',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@test.test',
      isAdmin: true,
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
    owner: {
      id: '553c3ef8b8cdcd1501ba123a',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@test.test',
      isAdmin: true,
      name: 'Sally Doe',
      url: 'https://your-company.canny.io/admin/user/sally-doe',
      userID: '1234',
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
  };

  const response = await cannyAPI.posts.retrieve('553c3ef8b8cdcd1501ba1238');

  t.deepEqual(response, expectedResponse);
});

test('Create must return the id of the created post', async (t) => {
  const expectedResponse: ICannyPostCreateResponse = {
    id: '553c3ef8b8cdcd1501ba1240',
  };

  const response = await cannyAPI.posts.create({
    authorID: 'author-id',
    boardID: 'board-id',
    details: 'Details and stuff',
    title: 'Hey! Look at my post!',
  });

  t.deepEqual(response, expectedResponse);
});

test('Change post status must return the modified post', async (t) => {
  const expectedResponse: ICannyPostChangeResponse = {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
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
  };

  const response = await cannyAPI.posts.changePostStatus({
    changerID: 'changer-id',
    postID: 'post-id',
    shouldNotifyVoters: false,
    status: 'in progress',
  });
  t.deepEqual(response, expectedResponse);
});

test('Add post tag must return the modified post', async (t) => {
  const expectedResponse: ICannyPostChangeResponse = {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
    score: 72,
    status: 'in progress',
    statusChangedAt: '2017-08-24T23:22:00.000Z',
    tags: [
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba3234',
        name: 'iOS',
        postCount: 15,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
      },
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2018-04-20T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba12bb',
        name: 'Example Tag',
        postCount: 12,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=example-tag',
      },
    ],
    title: 'An awesome feature request',
    url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
  };

  const response = await cannyAPI.posts.addTag({
    postID: 'my-post-id',
    tagID: 'my-tag-id',
  });
  t.deepEqual(response, expectedResponse);
});

test('Remove post tag must return the modified post', async (t) => {
  const expectedResponse: ICannyPostChangeResponse = {
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
    by: {
      id: '524c3ef8b8cdcd1501ba246b',
      created: '2017-07-15T22:11:00.000Z',
      email: 'test@john.test',
      isAdmin: true,
      name: 'John Doe',
      url: 'https://your-company.canny.io/admin/user/john-doe',
      userID: '5678',
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
    mergeHistory: [
      {
        created: '2018-06-17T22:42:37.167Z',
        post: {
          created: '2018-06-17T22:42:00.797Z',
          details: 'Awesome feature post details',
          id: '553c3ef8b8cdcd1501ba6789',
          imageURLs: [],
          title: 'Another awesome feature request',
        },
      },
    ],
    score: 72,
    status: 'in progress',
    statusChangedAt: '2017-08-24T23:22:00.000Z',
    tags: [
      {
        board: {
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-08-30T13:32:01.000Z',
        id: '553c3ef8b8cdcd1501ba3234',
        name: 'iOS',
        postCount: 15,
        url: 'https://your-company.canny.io/admin/board/feature-requests?tags=ios',
      },
    ],
    title: 'An awesome feature request',
    url: 'https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request',
  };

  const response = await cannyAPI.posts.removeTag({
    postID: 'my-post-id',
    tagID: 'my-tag-id',
  });
  t.deepEqual(response, expectedResponse);
});
