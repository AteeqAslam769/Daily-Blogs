import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { appwriteAuthService } from '../appwrite/auth';
import { login as storeLogin } from '../features/authSlice';
import { Input, Button, Logo, Loader } from './index';

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (data) => {
        setLoading(true)
        setError('');
        try {
            let userData = await appwriteAuthService.signUp(data);
            if (userData) {
                userData = await appwriteAuthService.checkCurrentUserStatus();
                dispatch(storeLogin(userData));
                setLoading(false)
                navigate('/');
            }
        } catch (error) {
            setError(error.message || 'An error occurred during signup');
        }
    };

    return (
        loading?<Loader/>:
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-96 max-w-md p-8 rounded-lg shadow-2xl bg-white">
                <div className="flex justify-center">
                    <Logo className="w-36 mb-6" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign up to create account</h2>
                <p className="mt-2 text-center text-gray-600">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                <form onSubmit={handleSubmit(signup)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register('name', {
                                required: 'Full Name is required',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: 'Full Name can only contain letters and spaces'
                                }
                            })}
                            className={`bg-gray-200 focus:bg-white border-gray-300 focus:border-blue-500 rounded-md py-2 px-4 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Email address must be a valid address'
                                }
                            })}
                            className={`bg-gray-200 focus:bg-white border-gray-300 focus:border-blue-500 rounded-md py-2 px-4 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                }
                            })}
                            className={`bg-gray-200 focus:bg-white border-gray-300 focus:border-blue-500 rounded-md py-2 px-4 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
