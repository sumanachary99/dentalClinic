// Treatment-category photography for service / specialty cards.
// Free-license stock from Pexels (commercial use, no attribution required),
// bundled locally so the cards load fast and don't depend on hotlinking.
// To swap in real clinic photos later, replace these files in src/assets/
// keeping the same names — nothing else needs to change.
import cardDental from '../assets/card-dental.webp';
import cardMaxillofacial from '../assets/card-maxillofacial.webp';
import cardImplants from '../assets/card-implants.webp';
import cardCosmetic from '../assets/card-cosmetic.webp';
import cardOrthodontics from '../assets/card-orthodontics.webp';
import cardHair from '../assets/card-hair.webp';
import cardSkin from '../assets/card-skin.webp';

// Maps every service-category id (see SERVICE_CATEGORIES) to a representative photo.
// Used for the homepage specialty (Clinical Tracks) cards.
export const CATEGORY_IMAGES = {
  dental: cardDental,
  maxillofacial: cardMaxillofacial,
  implants: cardImplants,
  cosmetic: cardCosmetic,
  orthodontics: cardOrthodontics,
  hair: cardHair,
  skin: cardSkin,
};

// Fallback for any category id not explicitly mapped.
export const cardImageFor = (categoryId) => CATEGORY_IMAGES[categoryId] ?? cardDental;

// One distinct photo per individual service, auto-collected from src/assets/svc-<id>.webp.
// The <id> in each filename matches a service id in SERVICE_CATEGORIES/SERVICES.
// Drop a real clinic photo at src/assets/svc-<serviceId>.webp to override any of these.
// NOTE: this glob is matched at build time — if the file extension of the
// assets ever changes, change it here too or every card silently falls back
// to its category photo.
const serviceModules = import.meta.glob('../assets/svc-*.webp', { eager: true, import: 'default' });
export const SERVICE_IMAGES = Object.fromEntries(
  Object.entries(serviceModules).map(([path, url]) => {
    const id = path.match(/svc-(.+)\.webp$/)[1];
    return [id, url];
  })
);

// Prefer the service-specific photo; fall back to the category photo, then dental.
export const serviceImageFor = (serviceId, categoryId) =>
  SERVICE_IMAGES[serviceId] ?? cardImageFor(categoryId);
