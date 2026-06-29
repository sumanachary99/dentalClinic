// Treatment-category photography for service / specialty cards.
// Free-license stock from Pexels (commercial use, no attribution required),
// bundled locally so the cards load fast and don't depend on hotlinking.
// To swap in real clinic photos later, replace these files in src/assets/
// keeping the same names — nothing else needs to change.
import cardDental from '../assets/card-dental.jpg';
import cardMaxillofacial from '../assets/card-maxillofacial.jpg';
import cardImplants from '../assets/card-implants.jpg';
import cardCosmetic from '../assets/card-cosmetic.jpg';
import cardOrthodontics from '../assets/card-orthodontics.jpg';
import cardHair from '../assets/card-hair.jpg';
import cardSkin from '../assets/card-skin.jpg';

// Maps every service-category id (see SERVICE_CATEGORIES) to a representative photo.
export const CATEGORY_IMAGES = {
  dental: cardDental,
  maxillofacial: cardMaxillofacial,
  implants: cardImplants,
  cosmetic: cardCosmetic,
  orthodontics: cardOrthodontics,
  hair: cardHair,
  skin: cardSkin,
};

// Fallback for any id not explicitly mapped.
export const cardImageFor = (categoryId) => CATEGORY_IMAGES[categoryId] ?? cardDental;
