import "reflect-metadata";
import { DataSource } from "typeorm";
import { Offer } from "./entities/offer.entity";
import { Config } from "../config/config"; 

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Config.db.host,
  port: Config.db.port,
  username: Config.db.user,
  password: Config.db.password,
  database: Config.db.name,
  synchronize: true,
  logging: false,
  entities: [Offer]
});