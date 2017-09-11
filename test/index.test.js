import rtmConnect from '../fixtures/rtm.connect.json';
import transport from '../src';

const mockPayload = JSON.stringify(rtmConnect);

describe('the transport', () => {
  let mockFetch;

  beforeEach(() => {
    jest.mock('form-data');
    jest.mock('electron-fetch');
    mockFetch = require('electron-fetch');
    mockFetch.mockResponse(mockPayload);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should invoke the callback with the response', async () => {
    const callback = jest.fn();

    await transport({
      url: 'https://slack.com/api/rtm.connect',
      data: {},
      headers: {}
    }, callback);

    expect(callback).toHaveBeenCalledOnce;
    expect(callback.mock.calls[0][0]).toBeNull();
    expect(callback.mock.calls[0][3]).toEqual(mockPayload);
  });

  it('should use the parameters in the fetch call, and stringify non-strings', async () => {
    const url = 'https://slack.com/api/rtm.connect';
    const data = {
      token: 'abc123',
      presence_sub: true
    };
    const headers = { 'User-Agent': 'testing' }

    await transport({ url, data, headers }, jest.fn());

    expect(mockFetch).toHaveBeenCalledWith(url, jasmine.objectContaining({
      method: 'POST',
      body: { token: 'abc123', presence_sub: 'true' },
      headers
    }));
  });
});
