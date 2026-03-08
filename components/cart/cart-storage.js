export const CART_STORAGE_KEY = 'dino-cookies:cart:v1';

function isValidItem(x) {
  if (!x || typeof x !== 'object') return false;
  if (x.id == null) return false;
  if (typeof x.name !== 'string') return false;
  if (typeof x.price !== 'number' && typeof x.price !== 'string') return false;
  if (typeof x.qty !== 'number' && typeof x.qty !== 'string') return false;
  return true;
}

export function loadCartFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isValidItem);
  } catch {
    return null;
  }
}

export function saveCartToStorage(items) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}
