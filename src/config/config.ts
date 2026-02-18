import dotenv from 'dotenv';
dotenv.config();

export const Config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    name: process.env.DB_NAME || 'offers_db', 
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
  providers: {
    offer1: process.env.OFFER1_URL || 'http://localhost:3000/offers1',
    offer2: process.env.OFFER2_URL || 'http://localhost:3000/offers2',
  }
}