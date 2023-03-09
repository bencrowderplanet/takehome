// Shared types

interface Tract {
  fid: number;
  geom?: string;
  namelsad: string;
  name: string;
  statefp: string;
  countyfp: string;
  tractce: string;
  geoid: string;
  mtfcc: string;
  funcstat: string;
  aland: number;
  awater: number;
  intptlat: string;
  intptlon: string;
}

export type { Tract };
