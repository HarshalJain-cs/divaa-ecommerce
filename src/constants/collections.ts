/**
 * @file Collections Constants
 * @description Constants for Shop by Relation and Shop by Occasion
 */

export interface CollectionItem {
  id: string;
  label: string;
  path: string;
}

/**
 * Shop by Relation Categories
 * Based on Giva.co's relation filters
 */
export const RELATIONS: CollectionItem[] = [
  { id: 'for-her', label: 'For Her', path: '/collections/for-her' },
  { id: 'for-him', label: 'For Him', path: '/collections/for-him' },
  { id: 'mother', label: 'Mother', path: '/collections/mother' },
  { id: 'sister', label: 'Sister', path: '/collections/sister' },
  { id: 'friend', label: 'Friend', path: '/collections/friend' },
  { id: 'couple', label: 'Couple', path: '/collections/couple' },
  { id: 'kids', label: 'Kids', path: '/collections/kids' },
];

/**
 * Shop by Occasion Categories
 * Based on Giva.co's occasion filters
 */
export const OCCASIONS: CollectionItem[] = [
  { id: 'wedding', label: 'Wedding', path: '/collections/wedding' },
  { id: 'birthday', label: 'Birthday', path: '/collections/birthday' },
  { id: 'anniversary', label: 'Anniversary', path: '/collections/anniversary' },
  { id: 'just-because', label: 'Just Because', path: '/collections/just-because' },
  { id: 'say-thanks', label: 'Say Thanks', path: '/collections/say-thanks' },
];

/**
 * Map relation ID to database filter values
 */
export const RELATION_FILTERS: Record<string, string[]> = {
  'for-her': ['wife', 'girlfriend', 'mother', 'sister', 'daughter', 'friend'],
  'for-him': ['husband', 'boyfriend', 'father', 'brother', 'son'],
  'mother': ['mother'],
  'sister': ['sister'],
  'friend': ['friend'],
  'couple': ['couple', 'wife', 'husband'],
  'kids': ['kids', 'son', 'daughter'],
};

/**
 * Map occasion ID to database filter values
 */
export const OCCASION_FILTERS: Record<string, string[]> = {
  'wedding': ['wedding'],
  'birthday': ['birthday'],
  'anniversary': ['anniversary'],
  'just-because': ['just-because'],
  'say-thanks': ['say-thanks'],
};
