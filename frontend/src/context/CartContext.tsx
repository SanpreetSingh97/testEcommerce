"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";
import { getStoredCartId, setStoredCartId, clearStoredCartId } from "@/lib/cartStorage";
import type { Cart } from "@/types";

type CartContextValue = {
  cart: Cart | null;
  cartId: string | null;
  itemCount: number;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    const storedId = getStoredCartId();
    if (!storedId) {
      setCart(null);
      setCartId(null);
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      setError(null);
      const data = await api.getCart(storedId);
      setCart(data);
      setCartId(data._id);
    } catch {
      setCart(null);
      setCartId(null);
      clearStoredCartId();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      setRefreshing(true);
      setError(null);
      try {
        const data = await api.addToCart({
          cartId: getStoredCartId(),
          productId,
          quantity,
        });
        setStoredCartId(data._id);
        setCart(data);
        setCartId(data._id);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to add item to cart";
        setError(message);
        throw err;
      } finally {
        setRefreshing(false);
      }
    },
    []
  );

  const updateItem = useCallback(
    async (itemId: string, quantity: number) => {
      const id = getStoredCartId();
      if (!id) return;

      setRefreshing(true);
      setError(null);
      try {
        const data = await api.updateCartItem(id, { itemId, quantity });
        setCart(data);
        setCartId(data._id);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update cart";
        setError(message);
        throw err;
      } finally {
        setRefreshing(false);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      cart,
      cartId,
      itemCount: cart?.itemCount ?? 0,
      loading,
      refreshing,
      error,
      addItem,
      updateItem,
      refreshCart,
    }),
    [
      cart,
      cartId,
      loading,
      refreshing,
      error,
      addItem,
      updateItem,
      refreshCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
