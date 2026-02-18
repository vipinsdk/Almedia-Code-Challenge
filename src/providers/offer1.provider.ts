import {Provider} from './base.provider';
import {Offer} from '../database/entities/offer.entity';

export class Offer1Provider extends Provider {
    
    constructor(providerName: string, apiUrl: string) {
        super();
        this.providerName = providerName;
        this.apiUrl = apiUrl;
    }

    // async fetch(): Promise<any> {
    //     // for now return the static payload defined in offer1.payload.ts
    //     // in a actual implementation, this would be replaced by an API call to the provider's endpoint
    //     return payload.response.offers;
    // }

    async mapToOfferDB(payload: any): Promise<Offer[]> {
        const offers: Offer[] = [];        
        payload = payload.response.offers; 
        for (const raw of payload) {
            var offer = new Offer();
            offer.name = raw.offer_name;
            offer.externalOfferId = raw.offer_id;
            offer.description = raw.offer_desc;
            offer.requirements = raw.call_to_action;
            offer.offerUrlTemplate = raw.offer_url;
            offer.thumbnail = raw.image_url;

           offer.isDesktop = raw.platform === 'desktop' ? 1 : 0;
            offer.isAndroid = raw.platform === 'mobile' && raw.device !== 'iphone_ipad' ? 1 : 0;
            offer.isIos = raw.platform === 'mobile' && raw.device === 'iphone_ipad' ? 1 : 0;
            
            offer.providerName = this.providerName;
            offer.slug = `${this.providerName}-${offer.externalOfferId}`;

            const isValid = await this.validateOffer(offer);
            if (isValid) {
                offers.push(offer);
            }
        }

        return offers
    }
}