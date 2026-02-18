import { describe, it, expect, vi } from 'vitest';
import { Offer2Provider } from './offer2.provider';

describe('Offer2Provider', () => {
  const provider = new Offer2Provider('Offer2', 'http://mock-url');

  it('should transform a valid android offer correctly', async () => {
    const mockPayload = {
      status: "success",
      data: {
        "15829": {
            Offer: {
                campaign_id: 15829,
                name: "Valid Android Campaign",
                description: "High payout valid offer",
                instructions: "Reach level 10",
                icon: "https://valid.url/icon1.png",
                tracking_url: "https://valid.url/track1"
            },
            OS: { android: true, ios: false, web: false }
        },
    }
};

    const result = await provider.mapToOfferDB(mockPayload);
    
    expect(result).toHaveLength(1);
    expect(result[0].isIos).toBe(0);
    expect(result[0].isAndroid).toBe(1);
    expect(result[0].isDesktop).toBe(0);
  });

  it('should skip offers that fail validation (missing name)', async () => {
    const mockPayload = {
        status: "success",
        data: {
        "15830": {
            Offer: {
                campaign_id: 15830,
                name: "", // INVALID: Empty name
                description: "Empty name test",
                instructions: "N/A",
                icon: "https://valid.url/icon.png",
                tracking_url: "https://valid.url/track"
            },
            OS: { android: false, ios: true, web: true }
        },
    }};

    const result = await provider.mapToOfferDB(mockPayload);
    expect(result).toHaveLength(0); 
  });
});