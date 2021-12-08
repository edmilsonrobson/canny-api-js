import test from 'ava';
import MockAdapter from 'axios-mock-adapter';

import CannyAPI from './CannyAPI';
import Companies from './Companies';

const DUMMY_SECRET_API_KEY = 'my-api-key';

const cannyAPI = new CannyAPI({
  apiKey: DUMMY_SECRET_API_KEY,
});

const mockedAxios = new MockAdapter(cannyAPI.axios);

// ? Mocking of axios.
mockedAxios
  .onPost(Companies.COMPANIES_DELETE_ROUTE)
  .reply<string>(200, 'success');

test('Deleting a company must return success', async (t) => {
  const expectedResponse = 'success';

  const response = await cannyAPI.companies.delete('some-company-id');

  t.deepEqual(response, expectedResponse);
});
