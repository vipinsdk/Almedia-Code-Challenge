import "reflect-metadata";
import { OfferService } from "./services/offer.service";
import { AppDataSource } from "./database/database.config";
import { logger } from "./utils/logger";

async function main() {
  try {
    // Initialize Database Connection
    await AppDataSource.initialize();
    logger.info("Database connected successfully");

    // Run the offer fetch and transform process
    const offerService = new OfferService();
    await offerService.run();

    logger.info("Offer fetch and transform process completed");
    process.exit(0);

  } catch (error) {
    logger.error("Error during application bootstrap:", error);
    process.exit(1);
  }
}

main();