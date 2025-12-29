// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { Music, Mail, Lock, User, Eye, EyeOff, Calendar } from 'lucide-react'
// import toast from 'react-hot-toast'

// /**
//  * Registration Page Component
//  * Handles new user account creation with form validation
//  */
// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     birthDate: '',
//     acceptTerms: false,
//     newsletter: true
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState({})
  
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   /**
//    * Handle input changes
//    */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
    
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }))
//     }
//   }

//   /**
//    * Validate form data
//    */
//   const validateForm = () => {
//     const newErrors = {}
    
//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Full name is required'
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters'
//     }
    
//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address'
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters'
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain uppercase, lowercase, and numbers'
//     }
    
//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password'
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match'
//     }
    
//     // Birth date validation
//     if (!formData.birthDate) {
//       newErrors.birthDate = 'Birth date is required'
//     } else {
//       const birthDate = new Date(formData.birthDate)
//       const today = new Date()
//       const age = today.getFullYear() - birthDate.getFullYear()
      
//       if (age < 13) {
//         newErrors.birthDate = 'You must be at least 13 years old'
//       }
//     }
    
//     // Terms acceptance validation
//     if (!formData.acceptTerms) {
//       newErrors.acceptTerms = 'You must accept the terms and conditions'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   /**
//    * Handle form submission
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) {
//       return
//     }
    
//     setIsLoading(true)
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       // Create mock user - Replace with actual Firebase registration
//       const mockUser = {
//         id: `user_${Date.now()}`,
//         email: formData.email,
//         name: formData.name,
//         avatar: null,
//         subscription: 'free',
//         birthDate: formData.birthDate,
//         newsletter: formData.newsletter,
//         createdAt: new Date().toISOString()
//       }
      
//       // Save to context and localStorage
//       login(mockUser)
      
//       // Show success message
//       toast.success('Account created successfully! Welcome to SoundWave.')
      
//       // Redirect to home page
//       navigate('/')
      
//     } catch (error) {
//       console.error('Registration error:', error)
//       toast.error(error.message || 'Registration failed. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   /**
//    * Calculate minimum and maximum birth dates for validation
//    */
//   const today = new Date()
//   const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
//   const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//               <Music size={32} className="text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Join SoundWave</h1>
//           <p className="text-gray-400">Create your account and start listening</p>
//         </div>

//         {/* Registration Form */}
//         <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Two-column layout for larger screens */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name Field */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                       errors.name ? 'border-red-500' : 'border-gray-700'
//                     }`}
//                     placeholder="John Doe"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-2 text-sm text-red-400">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                       errors.email ? 'border-red-500' : 'border-gray-700'
//                     }`}
//                     placeholder="you@example.com"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-2 text-sm text-red-400">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                       errors.password ? 'border-red-500' : 'border-gray-700'
//                     }`}
//                     placeholder="••••••••"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
//                     disabled={isLoading}
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-2 text-sm text-red-400">{errors.password}</p>
//                 )}
//                 <div className="mt-2 text-xs text-gray-400">
//                   Must be at least 8 characters with uppercase, lowercase, and numbers
//                 </div>
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
//                     }`}
//                     placeholder="••••••••"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
//                     disabled={isLoading}
//                   >
//                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>
//                 )}
//               </div>

//               {/* Birth Date Field */}
//               <div>
//                 <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
//                   Date of Birth
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Calendar size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     type="date"
//                     id="birthDate"
//                     name="birthDate"
//                     value={formData.birthDate}
//                     onChange={handleChange}
//                     min={minDate.toISOString().split('T')[0]}
//                     max={maxDate.toISOString().split('T')[0]}
//                     className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                       errors.birthDate ? 'border-red-500' : 'border-gray-700'
//                     }`}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.birthDate && (
//                   <p className="mt-2 text-sm text-red-400">{errors.birthDate}</p>
//                 )}
//                 <div className="mt-2 text-xs text-gray-400">
//                   You must be at least 13 years old
//                 </div>
//               </div>
//             </div>

//             {/* Checkboxes */}
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="acceptTerms"
//                   name="acceptTerms"
//                   checked={formData.acceptTerms}
//                   onChange={handleChange}
//                   className="w-4 h-4 mt-1 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
//                   disabled={isLoading}
//                 />
//                 <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-300">
//                   I agree to the{' '}
//                   <a href="#" className="text-green-400 hover:text-green-300">
//                     Terms of Service
//                   </a>{' '}
//                   and{' '}
//                   <a href="#" className="text-green-400 hover:text-green-300">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>
//               {errors.acceptTerms && (
//                 <p className="text-sm text-red-400">{errors.acceptTerms}</p>
//               )}

//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="newsletter"
//                   name="newsletter"
//                   checked={formData.newsletter}
//                   onChange={handleChange}
//                   className="w-4 h-4 mt-1 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
//                   disabled={isLoading}
//                 />
//                 <label htmlFor="newsletter" className="ml-2 text-sm text-gray-300">
//                   Send me news, offers, and playlist recommendations from SoundWave
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6 pt-6 border-t border-gray-700">
//             <p className="text-center text-gray-400 text-sm">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="text-green-400 hover:text-green-300 font-medium transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             Protected by reCAPTCHA. Google's{' '}
//             <a href="#" className="text-green-400 hover:text-green-300">
//               Privacy Policy
//             </a>{' '}
//             and{' '}
//             <a href="#" className="text-green-400 hover:text-green-300">
//               Terms of Service
//             </a>{' '}
//             apply.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register


// Import necessary React hooks and components
import React, { useState } from 'react';
// Import icons from lucide-react library
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Calendar, Sparkles } from 'lucide-react';
// Import routing utilities for navigation
import { Link, useNavigate } from 'react-router-dom';
// Import custom Loader component
//import Loader from '../components/Loader';

const Register = () => {
  // ========== STATE MANAGEMENT ==========
  
  // State for form data with all fields initialized to empty strings
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '' // Store date in YYYY-MM-DD format
  });
  
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to toggle confirm password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);
  // State to store error messages
  const [error, setError] = useState('');
  // State to track successful registration
  const [success, setSuccess] = useState(false);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // ========== EVENT HANDLERS ==========
  
  /**
   * Handle input changes for all form fields
   * @param {Event} e - The change event from input fields
   */
  const handleChange = (e) => {
    // Update formData using computed property name based on input's name attribute
    setFormData({
      ...formData, // Spread existing form data
      [e.target.name]: e.target.value // Update specific field
    });
    // Clear any existing errors when user starts typing
    if (error) setError('');
  };

  /**
   * Calculate age from birthdate
   * @param {string} birthdate - Date string in YYYY-MM-DD format
   * @returns {number} - Calculated age
   */
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  /**
   * Validate form data before submission
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Check minimum password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Regular expressions for password complexity
    const hasNumber = /\d/.test(formData.password); // Check for at least one digit
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password); // Check for special chars
    
    // Enforce password complexity
    if (!hasNumber || !hasSpecialChar) {
      setError('Password must contain at least one number and one special character');
      return false;
    }

    // Age validation (must be 13+)
    if (formData.birthdate) {
      const age = calculateAge(formData.birthdate);
      if (age < 13) {
        setError('You must be at least 13 years old to register');
        return false;
      }
    }

    return true; // All validations passed
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading state
    setError(''); // Clear previous errors
    setSuccess(false); // Reset success state

    // Validate form before proceeding
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Log registration data (replace with actual API call in production)
      console.log('Registration data:', { 
        ...formData, 
        age: calculateAge(formData.birthdate) 
      });
      
      // Simulate API call delay (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store mock user data in localStorage (for demo purposes)
      // In production, use Firebase Auth or similar service
      localStorage.setItem('music_token', 'demo_token_' + Date.now());
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_name', formData.name);
      
      // Show success message
      setSuccess(true);
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      // Handle registration errors
      setError('Registration failed. Please try again later.');
    } finally {
      // Always turn off loading state
      setLoading(false);
    }
  };

  /**
   * Pre-fill form with demo data for testing
   */
  const handleDemoFill = () => {
    setFormData({
      name: 'Demo User',
      email: 'demo@melodyflow.com',
      password: 'Demo@123', // Includes number and special character
      confirmPassword: 'Demo@123',
      birthdate: '1995-01-01' // 29 years old (as of 2024)
    });
    setError(''); // Clear any existing errors
  };

  // ========== RENDERING LOGIC ==========
  
  // Show loader while processing registration
  if (loading) {
    return <Loader message="Creating your account..." />;
  }

  return (
    // ========== MAIN CONTAINER ==========
    // Full-screen container with gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      
      {/* ========== REGISTRATION CARD ========== */}
      {/* Glassmorphism effect card with blur and shadows */}
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-2xl p-8 border border-white/10">
        
        {/* ========== HEADER SECTION ========== */}
        <div className="flex flex-col items-center mb-10 relative">
          {/* Decorative sparkles icon */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          {/* Logo with gradient background */}
          <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
            <UserPlus className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          {/* App name with gradient text */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Join MelodyFlow
          </h1>
          {/* Subtitle */}
          <p className="text-slate-300 mt-2 text-lg">Start your musical journey today</p>
        </div>

        {/* ========== SUCCESS MESSAGE ========== */}
        {/* Shows when registration is successful */}
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl text-white text-center animate-pulse">
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2 animate-ping"></div>
              Account created successfully! Redirecting to login...
            </div>
          </div>
        )}

        {/* ========== ERROR MESSAGE ========== */}
        {/* Shows validation or API errors */}
        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
              {error}
            </div>
          </div>
        )}

        {/* ========== DEMO BUTTON ========== */}
        {/* Button to pre-fill form with demo data */}
        <button
          onClick={handleDemoFill}
          className="w-full mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
        >
          Fill with Demo Data
        </button>

        {/* ========== REGISTRATION FORM ========== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ========== PERSONAL INFO FIELDS ========== */}
          {/* Grid layout for name, email, and birthdate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-cyan-400" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600"
                placeholder="John Doe"
                required // HTML5 required attribute
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                Email Address
              </label>
              <input
                type="email" // HTML5 email validation
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Birthdate Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                Date of Birth
              </label>
              <input
                type="date" // HTML5 date picker
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600"
                required
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
              />
              {/* Display calculated age */}
              {formData.birthdate && (
                <p className="mt-1 text-xs text-cyan-400">
                  Age: {calculateAge(formData.birthdate)} years
                </p>
              )}
            </div>
          </div>

          {/* ========== PASSWORD FIELDS ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-cyan-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle visibility
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600 pr-12"
                  placeholder="••••••••"
                  required
                />
                {/* Toggle password visibility button */}
                <button
                  type="button" // Prevent form submission
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password requirements hint */}
              <p className="mt-1 text-xs text-slate-500">
                Must be at least 8 characters with numbers and special characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600 pr-12"
                  placeholder="••••••••"
                  required
                />
                {/* Toggle confirm password visibility button */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Real-time password match indicator */}
              {formData.password && formData.confirmPassword && (
                <p className={`mt-1 text-xs ${
                  formData.password === formData.confirmPassword 
                    ? 'text-cyan-400' 
                    : 'text-rose-400'
                }`}>
                  {formData.password === formData.confirmPassword 
                    ? '✓ Passwords match' 
                    : '✗ Passwords do not match'}
                </p>
              )}
            </div>
          </div>

          {/* ========== TERMS & CONDITIONS ========== */}
          <div className="flex items-start">
            <div className="relative mt-1">
              {/* Hidden checkbox for accessibility */}
              <input
                type="checkbox"
                id="terms"
                className="sr-only" // Screen reader only
                required
              />
              {/* Custom checkbox styling */}
              <div className="w-5 h-5 bg-white/5 border-2 border-slate-600 rounded flex items-center justify-center cursor-pointer">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-0 transition-opacity"></div>
              </div>
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-slate-300 cursor-pointer">
              I agree to the{' '}
              <Link to="/terms" className="text-cyan-400 hover:text-cyan-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300">
                Privacy Policy
              </Link>
              . I confirm that I am at least 13 years old.
            </label>
          </div>

          {/* ========== SUBMIT BUTTON ========== */}
          <button
            type="submit"
            disabled={loading} // Disable during submission
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            {loading ? (
              // Loading state with spinner
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </span>
            ) : (
              // Normal state
              'Create MelodyFlow Account'
            )}
          </button>
        </form>

        {/* ========== LOGIN LINK ========== */}
        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-all duration-300 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* ========== FOOTER ========== */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-500 text-center">
            Your data is secured with industry-standard encryption.
            <br />
            <span className="text-cyan-400/70">We never share your personal information with third parties.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export component as default
export default Register;