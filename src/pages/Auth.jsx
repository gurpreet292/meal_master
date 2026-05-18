import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Button, Input, Label } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login: appLogin, register: appRegister } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        appLogin({ email, password });
        navigate('/dashboard');
      } else {
        appRegister({ name, email, password, preferences: {} });
        navigate('/onboarding');
      }
    } catch (err) {
      alert(err.message || 'Authentication error');
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* Left Side - Beautiful Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sage/20 via-cream to-soft-orange/20 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-soft-orange/30 rounded-full blur-3xl" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 p-12 max-w-xl text-center space-y-8"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-9xl"
          >
            🥗
          </motion.div>
          
          <div>
            <h2 className="text-5xl font-bold text-foreground mb-4">
              {isLogin ? "Welcome Back!" : "Start Your Journey"}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isLogin 
                ? "Ready to pick up where you left off? Let's get healthy together." 
                : "Join 50K+ users transforming their lives with AI-powered meal planning."}
            </p>
          </div>

          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="space-y-4 text-left"
          >
            {[
              { icon: '✨', text: 'AI-powered personalized meals' },
              { icon: '📊', text: 'Track nutrition effortlessly' },
              { icon: '👥', text: 'Join our healthy community' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-lg text-foreground">
                <span className="text-3xl">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            {/* Logo on mobile */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold">MM</div>
                <span className="text-xl font-bold text-foreground">MealMaster</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="glass rounded-3xl p-8 space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin 
                    ? 'Welcome back to your health journey' 
                    : 'Let\'s get you started with MealMaster'}
                </p>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-card transition-colors">
                  <FaGoogle className="w-5 h-5 text-sage" />
                  <span className="hidden sm:inline text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-card transition-colors">
                  <FaFacebook className="w-5 h-5 text-sage" />
                  <span className="hidden sm:inline text-sm font-medium">Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">or continue with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field (Register only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <button type="button" className="text-xs text-sage hover:text-sage-dark transition">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Terms (Register only) */}
                {!isLogin && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm text-muted-foreground">
                      I agree to the <a href="#" className="text-sage hover:underline">Terms of Service</a> and <a href="#" className="text-sage hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                )}

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Toggle Login/Register */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sage font-semibold hover:text-sage-dark transition"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>

            {/* Back to home */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground transition text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
