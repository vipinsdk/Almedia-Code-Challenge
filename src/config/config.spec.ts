import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import { Config } from './config';


describe('Configuration Logic', () => {
  beforeEach(() => {
    vi.resetModules(); 
  });

  it('should use default values', async () => {
    expect(Config.db.host).toBe('localhost');
    expect(Config.db.port).toBe(5432);
    expect(Config.providers.offer1).toBe('http://0.0.0.0:3000/offers1');
  });
});