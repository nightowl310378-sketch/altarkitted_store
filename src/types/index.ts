/**
 * @module Types
 * Defines the core data structures for the ALTARKITTED store.
 */

export type Category = 'Ranks' | 'Rank Upgrades' | 'Keys';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: Category;
  image?: string;
  icon?: string;
  perks?: string[];
  color?: string;
  isPopular?: boolean;
  tebexPackageId?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}
