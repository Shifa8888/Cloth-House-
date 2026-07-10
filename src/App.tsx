import { StoreProvider, useStore } from "./store/StoreContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ToastContainer } from "./components/Toast";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Auth } from "./pages/Auth";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Wishlist } from "./pages/Wishlist";
import { Account } from "./components/Account";

function Router() {
  const { route } = useStore();

  let page;
  switch (route.name) {
    case "home":
      page = <Home />;
      break;
    case "shop":
      page = <Shop />;
      break;
    case "product":
      page = <ProductDetail id={route.id} />;
      break;
    case "cart":
      page = <Cart />;
      break;
    case "checkout":
      page = <Checkout />;
      break;
    case "order":
      page = <OrderConfirmation id={route.id} />;
      break;
    case "auth":
      page = <Auth />;
      break;
    case "about":
      page = <About />;
      break;
    case "contact":
      page = <Contact />;
      break;
    case "wishlist":
      page = <Wishlist />;
      break;
    case "account":
      page = <Account />;
      break;
    default:
      page = <Home />;
  }

  const fullScreen = route.name === "home" || route.name === "about";

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className={`flex-1 ${fullScreen ? "" : ""}`}>{page}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
