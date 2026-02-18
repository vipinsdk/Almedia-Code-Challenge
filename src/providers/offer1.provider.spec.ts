import { describe, it, expect, vi } from 'vitest';
import { Offer1Provider } from './offer1.provider';

describe('Offer1Provider', () => {
  const provider = new Offer1Provider('Offer1', 'http://mock-url');

  it('should transform a valid mobile iOS offer correctly', async () => {
    const mockPayload = {
      response: {
        offers: [{
          offer_id: "123",
          offer_name: "Test App",
          offer_desc: "Desc",
          call_to_action: "Install",
          offer_url: "https://test.com",
          image_url: "https://test.com/img.png",
          platform: "mobile",
          device: "iphone_ipad"
        }]
      }
    };

    const result = await provider.mapToOfferDB(mockPayload.response.offers);
    
    expect(result).toHaveLength(1);
    expect(result[0].isIos).toBe(1);
    expect(result[0].isAndroid).toBe(0);
    expect(result[0].isDesktop).toBe(0);
  });

    it('should transform a valid mobile Android offer correctly', async () => {
    const mockPayload = {
      response: {
        offers: [{
          offer_id: "123",
          offer_name: "Test App",
          offer_desc: "Desc",
          call_to_action: "Install",
          offer_url: "https://test.com",
          image_url: "https://test.com/img.png",
          platform: "mobile",
          device: "android"
        }]
      }
    };

    const result = await provider.mapToOfferDB(mockPayload.response.offers);
    
    expect(result).toHaveLength(1);
    expect(result[0].isIos).toBe(0);
    expect(result[0].isAndroid).toBe(1);
    expect(result[0].isDesktop).toBe(0);
  });

  it('should skip offers that fail validation (missing name)', async () => {
    const mockPayload = {
      response: {
        offers: [{
          offer_id: "456",
          offer_url: "https://test.com",
          platform: "desktop"
        }]
      }
    };

    const result = await provider.mapToOfferDB(mockPayload.response.offers);
    expect(result).toHaveLength(0); 
  });
});