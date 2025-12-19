import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import { mockUsers } from '../../data/mockData';
import { loginAPI } from './api/loginAPI';
import { verifyTokenAPI } from './api/verifyTokenAPI';
import { registerAPI } from './api/registerAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { statesLGsInObject} from '../../data/stateData';


const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    localGovt: '',
    address: '',
    state: '',
    country: 'Nigeria',
    role: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loginUser, loginAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    toast("Sending data..")
    if (isLogin) {
      try {
        let token = await loginAPI({ password: formData.password, username: formData.email });
        if (token) {
          toast("User authenticated.. Wait ..")
          let user = await verifyTokenAPI(token);
          if (user?.role?.toLowerCase() === 'user' || 'provider') {
            toast("User verified");
            loginUser(user);
            navigate('/user-dashboard');
          } else if (user?.role.toLowerCase() === 'admin') {
            toast("Admin verified");
            loginAdmin(user);
            navigate('/admin-dashboard');
          } else {
            setErrors({ email: 'User not found.' });
            toast("User not verified");
          }
        } else {
          toast("User not authenticated")
        }
      } catch (error: any) {
        toast("Error! " + error.message)
      }


    } else {
      // Registration logic
      const newUser = {
        name: formData.fullName,
        username: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        localGovt: formData.localGovt,
        state: formData.state,
        country: formData.country,
        role: formData.role.startsWith('provider') ? "provider" : 'user',
        permissions: ['write','read'],
        status: 'no'
      };
      let result = await registerAPI(newUser);
      if (result) {
        toast("Registration successful.");
        navigate('/');
      } else {
        toast("Registration failed!");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <User className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Welcome back! Please sign in to continue.' : 'Join PropertyHub and start your property journey.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name or Business Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={!isLogin}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {!isLogin && <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                Your Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option key={'user'} value={'user'}>Customer/Client</option>
                <option key={'landlord'} value={'provider-1'}>Landlord</option>
                <option key={'property-manager'} value={'provider-2'}>Property Manager</option>
                <option key={'estate-manager'} value={'provider-3'}>Real Estate Manager</option>
                <option key={'estate-manager'} value={'provider-4'}>Agent</option>
              </select>
            </div>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
              {isLogin && (
                <p className="mt-1 text-sm text-gray-500">
                  Demo: Use john.doe@example.com
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex flex-row justify-between">
                Password
                {isLogin && <a href="#" onClick={() => navigate('/forget-password')}>Forget Password</a>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  autoComplete='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Local Govt.
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="localGovt"
                      name="localGovt"
                      type="text"
                      value={formData.localGovt}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  </div>
                </div> */}

                {!isLogin && (<div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {Object.keys(statesLGsInObject).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="localGovt" className="block text-sm font-medium text-gray-700 mb-2">
                      Local Government
                    </label>
                    <select
                      id="localGovt"
                      name="localGovt"
                      required
                      value={formData.localGovt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      {(statesLGsInObject[formData.state])?.map((LG: any) => (
                        <option key={LG} value={LG}>{LG}</option>
                      ))}
                    </select>
                  </div>
                </div>)}

                <div className="grid grid-cols-1 gap-4">
                
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;