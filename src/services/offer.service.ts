import { Provider } from "../providers/base.provider";
import { Offer1Provider } from "../providers/offer1.provider";
import { Offer2Provider } from "../providers/offer2.provider";
import { Offer } from "../database/entities/offer.entity";
import { Config } from "../config/config";
import { logger } from "../utils/logger";
import { AppDataSource } from "../database/database.config";


export class OfferService {
    private providers: Provider[] = [
        new Offer1Provider("Offer1", Config.providers.offer1),
        new Offer2Provider("Offer2", Config.providers.offer2)
    ];
    private offerRepository = AppDataSource.getRepository(Offer);

    async saveOffers(offers: Offer[]): Promise<void> {
        if (offers.length === 0) return;

        try {
            await this.offerRepository.upsert(offers, {
                conflictPaths: ['slug']
            });

            logger.info(`Successfully upserted ${offers.length} offers.`);
        } catch (error) {
            logger.error('Error during bulk offer upsert:', error);
            throw error;
        }
    }

    async run(): Promise<void> {
        for (const provider of this.providers) {
            try {
                const payload = await provider.fetch();
                const offers = await provider.mapToOfferDB(payload);
                logger.info(`Fetched and mapped ${offers.length} offers from ${provider.providerName}`);

                if (offers.length > 0) {
                    await this.saveOffers(offers);
                }
            } catch (error) {
                logger.error(`Error processing provider ${provider.providerName}:`, error);
            }
        }
    }
}