import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { Offer1Provider } from './offer1.provider';
import { payload } from './offer_payloads/offer1.payload';

vi.mock('axios');

describe('BaseProvider Fetch Logic', () => {
  const mockUrl = 'http://api.test.com/offers1';
  const provider = new Offer1Provider('TestProvider', mockUrl);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return data when the API call is successful', async () => {
    const mockData = payload;
    
    (axios.get as any).mockResolvedValue({ data: mockData });

    const result = await provider.fetch();

    expect(axios.get).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual(mockData.response.offers);
  });
});