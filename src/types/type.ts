// categories
export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

// all products
export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}