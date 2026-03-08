"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { loadCartFromStorage, saveCartToStorage } from './cart-storage';

function clampQty(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 1;
  return Math.min(99, Math.max(1, Math.round(x)));
}

function toCents(price) {
  // current app prices are integers (e.g. 16). Keep safe.
  const n = Number(price);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      return { ...state, items: Array.isArray(action.items) ? action.items : [] };
    }
    case 'ADD_ITEM': {
      const { item, qty } = action;
      const quantity = clampQty(qty ?? 1);
      const idx = state.items.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const next = state.items.slice();
        next[idx] = { ...next[idx], qty: clampQty(next[idx].qty + quantity) };
        return { ...state, items: next };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: quantity,
          },
        ],
      };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((x) => x.id !== action.id) };
    }
    case 'SET_QTY': {
      const quantity = clampQty(action.qty);
      const next = state.items.map((x) => (x.id === action.id ? { ...x, qty: quantity } : x));
      return { ...state, items: next };
    }
    case 'CLEAR': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const hasHydratedRef = useRef(false);
  const hadStoredCartRef = useRef(false);

  // hydrate once
  useEffect(() => {
    const stored = loadCartFromStorage();
    if (stored && stored.length > 0) {
      hadStoredCartRef.current = true;
      dispatch({ type: 'HYDRATE', items: stored });
    }
    hasHydratedRef.current = true;
  }, []);

  // persist (skip initial empty write before hydration completes)
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    // avoid writing an empty cart when there was no stored cart to begin with
    if (state.items.length === 0 && !hadStoredCartRef.current) return;
    saveCartToStorage(state.items);
  }, [state.items]);

  const api = useMemo(() => {
    const totalQty = state.items.reduce((acc, x) => acc + clampQty(x.qty), 0);
    const subtotalCents = state.items.reduce((acc, x) => acc + toCents(x.price) * clampQty(x.qty), 0);

    return {
      items: state.items,
      totalQty,
      subtotalCents,
      addItem: (item, qty) => dispatch({ type: 'ADD_ITEM', item, qty }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider />');
  return ctx;
}
