import axios from 'axios';
import { Offer } from '../database/entities/offer.entity';
import { validate } from 'class-validator';
import { logger } from '../utils/logger';

export abstract class Provider {
  providerName: string;
  apiUrl: string;

  getApiUrl(): string {
    return this.apiUrl;
  }

  async fetch(): Promise<any> {
    const response = await axios.get(this.getApiUrl());
    return response.data;
  }

  abstract mapToOfferDB(payload: any): Promise<Offer[]>;

  protected async validateOffer(offer: Offer): Promise<Offer | null> {
    const errors = await validate(offer);
    if (errors.length > 0) {
      logger.warn(`[${this.providerName}] Validation failed for offer ${offer.externalOfferId}. Skipping.`, errors);
      return null;
    }
    return offer;
  }
}