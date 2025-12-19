

import React, { useState, useEffect } from 'react';

import { confirmRegistrationAPI } from './api/confirmRegistrationAPI';
import { useNavigate } from 'react-router-dom';

interface ConfirmRegistrationProps {
    onNavigate: any
}

const ConfirmRegistrationPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        rcode: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Try to get email and confirmation code from URL parameters
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const codeParam = params.get('code');
        console.log(emailParam, codeParam);

        if (emailParam && codeParam) {
            setFormData({
                email: emailParam,
                rcode: codeParam
            });
            // Automatically confirm if both parameters are present
            handleConfirmation(emailParam, codeParam);
        }
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirmation = async (emailValue?: string, codeValue?: string) => {
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await confirmRegistrationAPI({
                email: emailValue || formData.email,
                rcode: codeValue || formData.rcode
            });

            if (response?.success) {
                setMessage('Registration confirmed successfully! You will be redirected to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            } else {
                setError(response?.message || 'Failed to confirm registration. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while confirming your registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleConfirmation();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Confirm Your Registration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please enter your email and confirmation code to complete the registration process
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="rcode" className="block text-sm font-medium text-gray-700">
                                Confirmation Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rcode"
                                    name="rcode"
                                    type="text"
                                    required
                                    value={formData.rcode}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter confirmation code"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">{message}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Confirming...' : 'Confirm Registration'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    or
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="#"
                                onClick={() => navigate("/login")}
                                className="w-full flex justify-center text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Back to Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRegistrationPage;