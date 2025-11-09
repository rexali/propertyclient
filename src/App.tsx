import React, { useState } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const propertyId = window.location.pathname.split('/')[2];

  const handleNavigate = (page: string, data?: any): void => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const helpNavigateWithParams = (propertyId: string) => {
    if (window.location.pathname === '/properties/' + propertyId) {
      setCurrentPage('property-details');
      setPageData(propertyId)
    }
  }

  React.useEffect(() => {
    helpNavigateWithParams(propertyId);
  }, [propertyId])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'properties':
        return <PropertiesPage onNavigate={handleNavigate} />;
      case 'property-details':
        return <PropertyDetailsPage propertyId={pageData} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLoginPage onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return <UserDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'forget-password':
        return <ForgetPasswordPage onNavigate={handleNavigate} />;
      case 'change-password':
        return <ChangePasswordPage onNavigate={handleNavigate} />;
      case 'confirm-registration':
        return <ConfirmRegistrationPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const shouldShowHeaderFooter = !['login', 'admin-login', 'user-dashboard', 'admin-dashboard'].includes(currentPage);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <PropertyProvider>
          <div className="min-h-screen flex flex-col">
            {shouldShowHeaderFooter && (
              <Header currentPage={currentPage} onNavigate={handleNavigate} />
            )}

            <main className="flex-1">
              {renderPage()}
            </main>
            <Toaster position='top-center' theme='dark' />
            {shouldShowHeaderFooter && (
              <Footer onNavigate={handleNavigate} />
            )}
          </div>
        </PropertyProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;