// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { Music, Mail, Lock, Eye, EyeOff } from 'lucide-react'
// import toast from 'react-hot-toast'

// /**
//  * Login Page Component
//  * Handles user authentication with email/password
//  * Includes form validation and error handling
//  */
// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState({})
  
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   /**
//    * Handle input changes
//    * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
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
//    * Toggle password visibility
//    */
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   /**
//    * Validate form data
//    * @returns {boolean} True if form is valid
//    */
//   const validateForm = () => {
//     const newErrors = {}
    
//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address'
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   /**
//    * Handle form submission
//    * @param {React.FormEvent} e - Form submit event
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) {
//       return
//     }
    
//     setIsLoading(true)
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // Mock authentication - Replace with actual Firebase auth
//       const mockUser = {
//         id: 'user_123',
//         email: formData.email,
//         name: formData.email.split('@')[0],
//         avatar: null,
//         subscription: 'free',
//         createdAt: new Date().toISOString()
//       }
      
//       // Save to context and localStorage
//       login(mockUser)
      
//       // Show success message
//       toast.success('Welcome back! Login successful.')
      
//       // Redirect to home page
//       navigate('/')
      
//     } catch (error) {
//       console.error('Login error:', error)
//       toast.error(error.message || 'Login failed. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   /**
//    * Handle demo login (for testing)
//    */
//   const handleDemoLogin = () => {
//     setFormData({
//       email: 'demo@example.com',
//       password: 'demo123',
//       rememberMe: false
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
//               <Music size={32} className="text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400">Sign in to continue to SoundWave</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail size={20} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                     errors.email ? 'border-red-500' : 'border-gray-700'
//                   }`}
//                   placeholder="you@example.com"
//                   disabled={isLoading}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-400">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                   Password
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-green-400 hover:text-green-300 transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock size={20} className="text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
//                     errors.password ? 'border-red-500' : 'border-gray-700'
//                   }`}
//                   placeholder="••••••••"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-400">{errors.password}</p>
//               )}
//             </div>

//             {/* Remember Me Checkbox */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="w-4 h-4 text-green-500 bg-gray-900 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
//                 disabled={isLoading}
//               />
//               <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
//                 Remember me for 30 days
//               </label>
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
//                   Signing In...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>

//             {/* Demo Login Button */}
//             <button
//               type="button"
//               onClick={handleDemoLogin}
//               disabled={isLoading}
//               className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Try Demo Account
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6 pt-6 border-t border-gray-700">
//             <p className="text-center text-gray-400 text-sm">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="text-green-400 hover:text-green-300 font-medium transition-colors"
//               >
//                 Sign up for free
//               </Link>
//             </p>
//           </div>

//           {/* Social Login Options */}
//           <div className="mt-6">
//             <p className="text-center text-gray-400 text-sm mb-4">Or continue with</p>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 className="flex items-center justify-center py-2.5 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.666-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.787-.94 1.324-2.245 1.171-3.54-1.133.052-2.506.754-3.32 1.69-.731.832-1.377 2.169-1.195 3.454 1.262.078 2.552-.663 3.344-1.604z"/>
//                 </svg>
//                 Apple
//               </button>
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 className="flex items-center justify-center py-2.5 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                 </svg>
//                 GitHub
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             By continuing, you agree to our{' '}
//             <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
//               Terms of Service
//             </a>{' '}
//             and{' '}
//             <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import { Music, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
//import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual Firebase authentication
      console.log('Login attempt:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store mock token in localStorage for demo
      localStorage.setItem('music_token', 'demo_token_123');
      localStorage.setItem('user_email', email);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@musicapp.com');
    setPassword('demopassword');
  };

  if (loading) {
    return <Loader message="Signing you in..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10 relative">
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
            <Music className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            MelodyFlow
          </h1>
          <p className="text-slate-300 mt-2 text-lg">Your gateway to unlimited music</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center animate-pulse">
            <div className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-ping"></div>
            {error}
          </div>
        )}

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
        >
          Try Demo Account
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/5 text-slate-400">Or continue with email</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-cyan-400" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-cyan-400" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-slate-600 pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                />
                <div className="w-5 h-5 bg-white/5 border-2 border-slate-600 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded opacity-0 transition-opacity"></div>
                </div>
              </div>
              <span className="ml-2 text-sm text-slate-300">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </span>
            ) : (
              'Sign In to MelodyFlow'
            )}
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 text-center">
          <p className="text-slate-400">
            New to MelodyFlow?{' '}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-all duration-300 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8">
          <p className="text-center text-sm text-slate-500 mb-4">Or sign in with</p>
          <div className="flex justify-center space-x-4">
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10">
              <div className="w-6 h-6 text-slate-300">G</div>
            </button>
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10">
              <div className="w-6 h-6 text-slate-300">f</div>
            </button>
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10">
              <div className="w-6 h-6 text-slate-300">in</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            <br />
            <span className="text-cyan-400/70">Experience music like never before</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;