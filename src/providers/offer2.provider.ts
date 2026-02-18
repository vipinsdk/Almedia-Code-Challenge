import {Provider} from './base.provider';
import {Offer} from '../database/entities/offer.entity';
import axios from 'axios';


export class Offer2Provider extends Provider {
    
    constructor(providerName: string, apiUrl: string) {
        super();
        this.providerName = providerName;
        this.apiUrl = apiUrl;
    }

     async fetch(): Promise<any> {
            const result = await axios.get(this.getApiUrl());
            return result.data.data;
        }

    async mapToOfferDB(payload: any): Promise<Offer[]> {
        const offers: Offer[] = [];

        for (const key in payload) {

            var raw = payload[key];
            var offer = new Offer();
            offer.externalOfferId = String(raw.Offer.campaign_id);
            offer.name = raw.Offer.name; 
            offer.thumbnail = raw.Offer.icon;
            offer.offerUrlTemplate = raw.Offer.tracking_url;
            offer.requirements = raw.Offer.instructions;
            offer.description = raw.Offer.description;
            offer.providerName = this.providerName;
            offer.slug = `${this.providerName}-${offer.externalOfferId}`;

            offer.isDesktop = raw.OS.web ? 1 : 0;
            offer.isAndroid = raw.OS.android ? 1 : 0;
            offer.isIos = raw.OS.ios ? 1 : 0;

            const isValid = await this.validateOffer(offer);
            if (isValid) {
                offers.push(offer);
            }
        }
        return offers;
    }
}