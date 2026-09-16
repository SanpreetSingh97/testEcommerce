export const CART_STORAGE_KEY = "ecommerce_cart_id";

export const getStoredCartId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_STORAGE_KEY);
};

export const setStoredCartId = (cartId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, cartId);
};

export const clearStoredCartId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
};
