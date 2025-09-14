import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SignupProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    graduationYear: '',
    degree: '',
    company: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate signup - in real app, you'd call an API
      setIsAuthenticated(true);
      alert('Account created successfully! Welcome to NEXUS.');
      navigate('/alumni');
    }
  };

  // Generate graduation years (last 50 years)
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <GraduationCap className="h-16 w-16 text-blue-600" />
              <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Join the NEXUS Community
          </h2>
          <p className="text-gray-600">
            Create your alumni network account
          </p>
        </div>

        {/* Signup Form */}
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-gray-900">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.name ? 'border-red-400' : 'focus:border-blue-500'}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.email ? 'border-red-400' : 'focus:border-blue-500'}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.password ? 'border-red-400' : 'focus:border-blue-500'}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.confirmPassword ? 'border-red-400' : 'focus:border-blue-500'}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Graduation Year */}
              <div>
                <Label htmlFor="graduationYear" className="text-gray-700">Graduation Year</Label>
                <Select value={formData.graduationYear} onValueChange={handleSelectChange('graduationYear')}>
                  <SelectTrigger className={`bg-white border-gray-300 text-gray-900 rounded-lg ${errors.graduationYear ? 'border-red-400' : 'focus:border-blue-500'}`}>
                    <SelectValue placeholder="Select graduation year" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent>
                    {graduationYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-500">{errors.graduationYear}</p>
                )}
              </div>

              {/* Degree */}
              <div>
                <Label htmlFor="degree" className="text-gray-700">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  type="text"
                  value={formData.degree}
                  onChange={handleChange}
                  className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.degree ? 'border-red-400' : 'focus:border-blue-500'}`}
                  placeholder="e.g., Computer Science Engineering"
                />
                {errors.degree && (
                  <p className="mt-1 text-sm text-red-500">{errors.degree}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <Label htmlFor="company" className="text-gray-700">Current Company</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className={`bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg ${errors.company ? 'border-red-400' : 'focus:border-blue-500'}`}
                  placeholder="Enter your current company"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg py-3 shadow-lg"
              >
                Create Account
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;