import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/frontend/pages/Home';
import About from './components/frontend/pages/About';
import Login from './components/frontend/pages/Login';
import Register from './components/frontend/pages/Register';
import VerifyEmail from './components/frontend/pages/VerifyEmail';
import { AuthProvider } from './context/AuthProvider';
import LoginAdmin from './components/admin/pages/LoginAdmin';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import PrivateAdminRoute from './components/admin/PrivateAdminRoute';
import './assets/css/style.scss';
import UsersList from './components/admin/Users/UsersList';
import UserForm from './components/admin/Users/UserForm';
import CategoriesList from './components/admin/Categories/CategoriesList';
import CategoryForm from './components/admin/Categories/CategoryForm';
import ProductList from './components/admin/Products/ProductList';
import ProductForm from './components/admin/Products/ProductForm';
import GiftsList from './components/admin/Gifts/GiftsList';
import GiftForm from './components/admin/Gifts/GiftForm';
import TestimonialsList from './components/admin/Testimonials/TestimonialsList';
import TestimonialForm from './components/admin/Testimonials/TestimonialForm';
import SliderList from './components/admin/Sliders/SliderList';
import SliderForm from './components/admin/Sliders/SliderForm';
import Profile from './components/frontend/pages/Profile';
import Products from './components/frontend/pages/Products';
import ProductDetail from './components/frontend/pages/ProductDetail';
import ProductReviewManagement from './components/admin/ProductReviewManagement';
import OrderManagement from './components/admin/OrderManagement';
import CartPage from './components/frontend/pages/CartPage';
import CheckoutPage from './components/frontend/pages/CheckoutPage';
import PaymentQR from './components/frontend/pages/PaymentQR';
import MyOrders from './components/frontend/pages/MyOrders';
import Services from './components/frontend/pages/Services';
import ShippingPolicy from './components/frontend/pages/ShippingPolicy';
import PrivacyPolicy from './components/frontend/pages/PrivacyPolicy';
import TermsOfService from './components/frontend/pages/TermsOfService';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentQR />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }
          />
          {/* Users */}
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/create" element={<UserForm mode="create" />} />
          <Route path="/admin/users/edit/:id" element={<UserForm mode="edit" />} />

          {/* Categories */}
          <Route path="/admin/categories" element={<CategoriesList />} />
          <Route path="/admin/categories/create" element={<CategoryForm mode="create" />} />
          <Route path="/admin/categories/edit/:id" element={<CategoryForm mode="edit" />} />
          {/* Products */}
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/create" element={<ProductForm mode="create" />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm mode="edit" />} />
          {/* Gifts */}
          <Route path="/admin/gifts" element={<GiftsList />} />
          <Route path="/admin/gifts/create" element={<GiftForm mode="create" />} />
          <Route path="/admin/gifts/edit/:id" element={<GiftForm mode="edit" />} />
          {/* Testimonials */}
          <Route path="/admin/testimonials" element={<TestimonialsList />} />
          <Route path="/admin/testimonials/create" element={<TestimonialForm mode="create" />} />
          <Route path="/admin/testimonials/edit/:id" element={<TestimonialForm mode="edit" />} />
          {/* Sliders */}
          <Route path="/admin/sliders" element={<SliderList />} />
          <Route path="/admin/sliders/create" element={<SliderForm />} />
          <Route path="/admin/sliders/edit/:id" element={<SliderForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/products/:productId/reviews" element={<ProductReviewManagement />} />

          <Route path="/admin/orders" element={<OrderManagement />} />
          {/* Nếu không tìm thấy route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;