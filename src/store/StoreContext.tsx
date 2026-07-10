import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";

/* ---------- Types ---------- */
export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type User = {
  name: string;
  email: string;
  password: string; // demo only
};

export type Order = {
  id: string;
  items: { product: Product; size: string; color: string; quantity: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  payment: {
    method: string;
    cardLast4: string;
  };
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered";
};

export type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

/* ---------- Routing (hash based) ---------- */
type Route =
  | { name: "home" }
  | { name: "shop"; category?: string }
  | { name: "product"; id: string }
  | { name: "cart" }
  | { name: "checkout" }
  | { name: "order"; id: string }
  | { name: "auth" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "account" }
  | { name: "wishlist" };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [path, ...rest] = hash.split("/");
  switch (path) {
    case "":
    case "home":
      return { name: "home" };
    case "shop":
      return { name: "shop", category: rest[0] };
    case "product":
      return { name: "product", id: rest[0] };
    case "cart":
      return { name: "cart" };
    case "checkout":
      return { name: "checkout" };
    case "order":
      return { name: "order", id: rest[0] };
    case "auth":
      return { name: "auth" };
    case "about":
      return { name: "about" };
    case "contact":
      return { name: "contact" };
    case "account":
      return { name: "account" };
    case "wishlist":
      return { name: "wishlist" };
    default:
      return { name: "home" };
  }
}

export function navigate(path: string) {
  window.location.hash = path.startsWith("#") ? path : `#/${path.replace(/^\/+/, "")}`;
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

/* ---------- Storage helpers ---------- */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

/* ---------- Context ---------- */
type StoreContextValue = {
  // routing
  route: Route;
  navigate: (path: string) => void;

  // cart
  cart: CartItem[];
  addToCart: (productId: string, size: string, color: string, quantity?: number) => void;
  updateCartQty: (productId: string, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // auth
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { ok: boolean; message: string };
  register: (name: string, email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;

  // orders
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;

  // toast
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;

  // search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash());
  const [cart, setCart] = useState<CartItem[]>(() => load("eleve_cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("eleve_wishlist", []));
  const [user, setUser] = useState<User | null>(() => load("eleve_user", null));
  const [users, setUsers] = useState<User[]>(() => load("eleve_users", []));
  const [orders, setOrders] = useState<Order[]>(() => load("eleve_orders", []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync route with hash
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Persist
  useEffect(() => save("eleve_cart", cart), [cart]);
  useEffect(() => save("eleve_wishlist", wishlist), [wishlist]);
  useEffect(() => save("eleve_user", user), [user]);
  useEffect(() => save("eleve_users", users), [users]);
  useEffect(() => save("eleve_orders", orders), [orders]);

  /* ---------- Toast ---------- */
  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  /* ---------- Cart ---------- */
  const addToCart = useCallback(
    (productId: string, size: string, color: string, quantity = 1) => {
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.size === size && i.color === color
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
          return next;
        }
        return [...prev, { productId, size, color, quantity }];
      });
      showToast("Added to cart");
    },
    [showToast]
  );

  const updateCartQty = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      setCart((prev) =>
        prev
          .map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(0, quantity) }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size && i.color === color)
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const p = products.find((p) => p.id === i.productId);
        return sum + (p ? p.price * i.quantity : 0);
      }, 0),
    [cart]
  );

  /* ---------- Wishlist ---------- */
  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        if (prev.includes(productId)) {
          showToast("Removed from wishlist", "info");
          return prev.filter((id) => id !== productId);
        }
        showToast("Added to wishlist");
        return [...prev, productId];
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  /* ---------- Auth ---------- */
  const login = useCallback(
    (email: string, password: string) => {
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        setUser(found);
        showToast(`Welcome back, ${found.name.split(" ")[0]}!`);
        return { ok: true, message: "Login successful" };
      }
      // Demo account fallback
      if (email === "demo@eleve.com" && password === "demo1234") {
        const demo = { name: "Demo User", email, password };
        setUser(demo);
        showToast("Welcome back, Demo User!");
        return { ok: true, message: "Login successful" };
      }
      return { ok: false, message: "Invalid email or password" };
    },
    [users, showToast]
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      if (users.find((u) => u.email === email)) {
        return { ok: false, message: "Email already registered" };
      }
      const newUser = { name, email, password };
      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      showToast(`Welcome to ÉLÉVE, ${name.split(" ")[0]}!`);
      return { ok: true, message: "Registration successful" };
    },
    [users, showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast("Logged out", "info");
  }, [showToast]);

  /* ---------- Orders ---------- */
  const placeOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
  }, [clearCart]);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const value: StoreContextValue = {
    route,
    navigate,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    wishlist,
    toggleWishlist,
    isWishlisted,
    user,
    users,
    login,
    register,
    logout,
    orders,
    placeOrder,
    getOrder,
    toasts,
    showToast,
    searchQuery,
    setSearchQuery,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
