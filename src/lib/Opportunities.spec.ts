import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Opportunities, {
  ICannyOpportunitiesListResponse,
} from './Opportunities';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios
  .onPost(Opportunities.OPPORTUNITIES_LIST_ROUTE)
  .reply<ICannyOpportunitiesListResponse>(200, {
    hasMore: false,
    opportunities: [
      {
        id: '61a942ed07bfe27b60109ee0',
        closed: true,
        name: 'Opportunity Name',
        postIDs: ['61a942ed07bfe27b60109eaf', '61a942ed07bfe27b60109ebc'],
        salesforceOpportunityID: '0063k00000zx6BkAAI',
        value: 1999.99,
        won: true,
      },
    ],
  });

test('List should return a list of opportunities', async (t) => {
  const expectedResponse: ICannyOpportunitiesListResponse = {
    hasMore: false,
    opportunities: [
      {
        id: '61a942ed07bfe27b60109ee0',
        closed: true,
        name: 'Opportunity Name',
        postIDs: ['61a942ed07bfe27b60109eaf', '61a942ed07bfe27b60109ebc'],
        salesforceOpportunityID: '0063k00000zx6BkAAI',
        value: 1999.99,
        won: true,
      },
    ],
  };

  const response = await cannyAPI.opportunities.list();

  t.deepEqual(response, expectedResponse);
});
