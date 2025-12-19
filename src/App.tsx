import { Toaster } from "sonner";
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import PropertiesPage from './components/pages/PropertiesPage';
import PropertyDetailsPage from './components/pages/PropertyDetailsPage';
import ServicesPage from './components/pages/ServicesPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/auth/LoginPage';
import AdminLoginPage from './components/auth/AdminLoginPage';
import ForgetPasswordPage from './components/auth/ForgetPasswordPage';
import ChangePasswordPage from './components/auth/ChangePasswordPage';
import ConfirmRegistrationPage from './components/auth/ConfirmRegistrationPage';
import UserDashboard from './components/dashboard/user/UserDashboard';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from "./components/pages/SearchPage";
import CategoryPage from "./components/pages/CategoryPage";
import ProviderPage from "./components/pages/ProviderPage";
import { Suspense } from "react";
import Fallback from "./components/common/Fallback";
import CheckoutPage from "./components/pages/CheckoutPage";
import CartPage from "./components/pages/CartPage";
import WishlistPage from "./components/pages/WishlistPage";

function App() {
  // const shouldShowHeaderFooter = !['login', 'admin-login', 'user-dashboard', 'admin-dashboard'].includes(currentPage);
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PropertyProvider>
          <Suspense fallback={<Fallback />}>
            <Router>
              <div className="min-h-screen flex flex-col">
                {/* {shouldShowHeaderFooter && ( */}
                <Header />
                {/* )} */}
                <main className="flex-1">
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='' element={<HomePage />} />
                    <Route path='home' element={<HomePage />} />
                    <Route path="properties" element={<PropertiesPage />} />
                    <Route path="properties/:id" element={<PropertyDetailsPage />} />
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="checkout/:id" element={<CheckoutPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="providers/:id" element={<ProviderPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path='services' element={<ServicesPage />} />
                    <Route path='about' element={<AboutPage />} />
                    <Route path='contact' element={<ContactPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='admin-login' element={<AdminLoginPage />} />
                    <Route path='forget-password' element={<ForgetPasswordPage />} />
                    <Route path='admin-dashboard' element={<AdminDashboard />} />
                    <Route path='change-password' element={<ChangePasswordPage />} />
                    <Route path='confirm-registration' element={<ConfirmRegistrationPage />} />
                    <Route path='user-dashboard' element={<UserDashboard />} />
                  </Routes>
                </main>
                <Toaster position='top-center' theme='dark' />
                {/* {shouldShowHeaderFooter && ( */}
                <Footer />
                {/* )} */}
              </div>
            </Router>
          </Suspense>
        </PropertyProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;