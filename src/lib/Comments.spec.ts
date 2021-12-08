import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Comments, {
  ICannyCommentCreateResponse,
  ICannyCommentListResponse,
} from './Comments';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios
  .onPost(Comments.COMMENTS_LIST_ROUTE)
  .reply<ICannyCommentListResponse>(200, {
    comments: [
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
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-07-15T22:11:00.000Z',
        imageURLs: [
          'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
          'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
        ],
        internal: false,
        likeCount: 2,
        mentions: [],
        parentID: '553c3ef8b8cdcd1501ba3333',
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
        value: 'Some cool comment',
      },
    ],
    hasMore: false,
  });

mockedAxios.onPost(Comments.COMMENTS_RETRIEVE_ROUTE).reply<ICannyComment>(200, {
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
  created: '2017-07-15T22:11:01.000Z',
  imageURLs: [
    'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
    'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
  ],
  internal: false,
  likeCount: 2,
  mentions: [],
  parentID: '553c3ef8b8cdcd1501ba3333',
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
  value: 'Some cool comment',
});

mockedAxios
  .onPost(Comments.COMMENTS_CREATE_ROUTE)
  .reply<ICannyCommentCreateResponse>(200, {
    id: '553c3ef8b8cdcd1501ba2200',
  });

mockedAxios
  .onPost(Comments.COMMENTS_DELETE_ROUTE)
  .reply<string>(200, 'success');

test('Retrieve must return a comment', async (t) => {
  const expectedResponse: ICannyComment = {
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
    created: '2017-07-15T22:11:01.000Z',
    imageURLs: [
      'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
      'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
    ],
    internal: false,
    likeCount: 2,
    mentions: [],
    parentID: '553c3ef8b8cdcd1501ba3333',
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
    value: 'Some cool comment',
  };

  const response = await cannyAPI.comments.retrieve('553c3ef8b8cdcd1501ba1238');

  t.deepEqual(response, expectedResponse);
});

test('List must return an array of comments', async (t) => {
  const expectedResponse: ICannyCommentListResponse = {
    comments: [
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
          created: '2017-07-10T11:22:00.000Z',
          id: '553c3ef8b8cdcd1501ba1234',
          name: 'Feature Requests',
          postCount: 123,
          url: 'https://your-company.canny.io/admin/board/feature-requests',
        },
        created: '2017-07-15T22:11:00.000Z',
        imageURLs: [
          'https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png',
          'https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg',
        ],
        internal: false,
        likeCount: 2,
        mentions: [],
        parentID: '553c3ef8b8cdcd1501ba3333',
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
        value: 'Some cool comment',
      },
    ],
    hasMore: false,
  };

  const response = await cannyAPI.comments.list();

  t.deepEqual(response, expectedResponse);
});

test('Create must return the id of the created comment', async (t) => {
  const expectedResponse: ICannyCommentCreateResponse = {
    id: '553c3ef8b8cdcd1501ba2200',
  };

  const response = await cannyAPI.comments.create({
    authorID: 'my-author-id',
    postID: 'my-post-id',
    value: 'Hey there!',
  });

  t.deepEqual(response, expectedResponse);
});

test('Delete must return success', async (t) => {
  const expectedResponse = 'success';

  const response = await cannyAPI.comments.delete('my-comment-id');

  t.deepEqual(response, expectedResponse);
});
