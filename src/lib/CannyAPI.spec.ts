import test from 'ava';

import CannyAPI from './cannyapi';

const DUMMY_SECRET_API_KEY = 'my-api-key';

test('CannyAPI config object gets loaded properly', (t) => {
  const cannyAPI = new CannyAPI({
    apiKey: DUMMY_SECRET_API_KEY,
  });

  const expectedConfig: ICannyAPIConfig = {
    apiKey: DUMMY_SECRET_API_KEY,
  };

  t.deepEqual(cannyAPI.config, expectedConfig);
});

test('CannyAPI class must throw an error if no apiKey is provided', (t) => {
  t.throws(() => new CannyAPI({} as ICannyAPIConfig));
});

test('CannyAPI must load axios config correctly', (t) => {
  const cannyAPI = new CannyAPI({
    apiKey: DUMMY_SECRET_API_KEY,
  });

  const expectedAxiosDefaults = {
    baseURL: 'https://canny.io/api/v1',
    params: {
      apiKey: DUMMY_SECRET_API_KEY,
    },
  };

  t.like(cannyAPI.axios.defaults, expectedAxiosDefaults);
});
