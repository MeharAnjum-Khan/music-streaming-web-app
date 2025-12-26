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