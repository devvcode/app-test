import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function Storefront() {
  return (
    <div className="storefront">
      <SiteHeader />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:slug" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Storefront />
    </BrowserRouter>
  );
}
