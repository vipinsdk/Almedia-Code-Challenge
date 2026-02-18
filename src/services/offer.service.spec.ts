import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OfferService } from './offer.service';
import { AppDataSource } from '../database/database.config';
import axios from 'axios';

vi.mock('axios');

vi.mock('../database/database.config', () => {
  return {
    AppDataSource: {
      getRepository: vi.fn().mockReturnValue({
        upsert: vi.fn().mockResolvedValue({}), 
      }),
    },
  };
});

describe('OfferService', () => {
  let offerService: OfferService;

  beforeEach(() => {
    vi.clearAllMocks();
    offerService = new OfferService();
  });

  it('should fetch from providers and save them to the database', async () => {
    (axios.get as any).mockResolvedValueOnce({
      data: {
        response: {
          offers: [{
                offer_id: "valid-1",
                offer_name: "Valid iOS App",
                offer_desc: "Standard valid description",
                call_to_action: "Install and run",
                offer_url: "https://valid.url/1",
                image_url: "https://valid.url/img1.png",
                platform: "mobile",
                device: "iphone_ipad"
            }]
        }
      }
    });

    (axios.get as any).mockResolvedValueOnce({
      data: {
        status: "success",
        data: {
          "15830": {
            Offer: {
                campaign_id: 15830,
                name: "offer_2", 
                description: "Empty name test",
                instructions: "N/A",
                icon: "https://valid.url/icon.png",
                tracking_url: "https://valid.url/track"
            },
            OS: { android: false, ios: true, web: true }
        }
        }
      }
    });

    await offerService.run();

    const repo = AppDataSource.getRepository('any');
    expect(repo.upsert).toHaveBeenCalled();
    expect(repo.upsert).toHaveBeenCalledTimes(2);
  });

  it('should handle a provider failure without crashing the whole service', async () => {
    (axios.get as any).mockRejectedValueOnce(new Error('Network Error'));
    
    (axios.get as any).mockResolvedValueOnce({
      data: { status: "success", data: {} }
    });

    await expect(offerService.run()).resolves.not.toThrow();
  });
});