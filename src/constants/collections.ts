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
 * Based on DIVA's occasion filters
 */
export const OCCASIONS: CollectionItem[] = [
  { id: 'engagement', label: 'Engagement', path: '/occasions/engagement' },
  { id: 'birthday', label: 'Birthday', path: '/occasions/birthday' },
  { id: 'wedding', label: 'Wedding', path: '/wedding' },
  { id: 'anniversary', label: 'Anniversary', path: '/occasions/anniversary' },
  { id: 'baby-shower', label: 'Baby Shower', path: '/occasions/baby-shower' },
  { id: 'baby-naming', label: 'Baby Naming', path: '/occasions/baby-naming' },
  { id: 'griha-pravesh', label: 'Griha Pravesh', path: '/occasions/griha-pravesh' },
];

/**
 * Shop by Festival Categories
 * Based on DIVA's festival filters
 */
export const FESTIVALS: CollectionItem[] = [
  { id: 'diwali', label: 'Diwali', path: '/festivals/diwali' },
  { id: 'akshaya-tritiya', label: 'Akshaya Tritiya', path: '/festivals/akshaya-tritiya' },
  { id: 'raksha-bandhan', label: 'Raksha Bandhan', path: '/festivals/raksha-bandhan' },
  { id: 'valentine-day', label: 'Valentine Day', path: '/festivals/valentine-day' },
  { id: 'mothers-day', label: 'Mothers Day', path: '/festivals/mothers-day' },
  { id: 'fathers-day', label: 'Fathers Day', path: '/festivals/fathers-day' },
  { id: 'friendship-day', label: 'Friendship Day', path: '/festivals/friendship-day' },
  { id: 'karwa-chauth', label: 'Karwa Chauth', path: '/festivals/karwa-chauth' },
  { id: 'bhaidooj', label: 'Bhaidooj', path: '/festivals/bhaidooj' },
  { id: 'eid', label: 'Eid', path: '/festivals/eid' },
  { id: 'navratri', label: 'Navratri', path: '/festivals/navratri' },
  { id: 'durga-puja', label: 'Durga Puja', path: '/festivals/durga-puja' },
  { id: 'christmas', label: 'Christmas', path: '/festivals/christmas' },
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
