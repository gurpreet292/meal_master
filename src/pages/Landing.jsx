import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ChefHat, Zap, BarChart3, Heart, Leaf, Users, Sparkles, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Meals',
      description: 'Get personalized meal plans tailored to your goals',
    },
    {
      icon: BarChart3,
      title: 'Track Nutrition',
      description: 'Monitor calories, proteins, and macros easily',
    },
    {
      icon: Leaf,
      title: 'Healthy Lifestyle',
      description: 'Build sustainable eating habits with smart guidance',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Share recipes and get inspired by others',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Fitness Enthusiast',
      text: 'MealMaster completely transformed how I eat. The AI suggestions are incredibly accurate!',
      avatar: '👩‍🦰',
    },
    {
      name: 'John D.',
      role: 'Busy Professional',
      text: 'Finally, a tool that makes meal planning effortless. Saves me hours every week.',
      avatar: '👨‍💼',
    },
    {
      name: 'Emma L.',
      role: 'Health Coach',
      text: 'I recommend MealMaster to all my clients. The nutrition tracking is unbeatable.',
      avatar: '👩‍⚕️',
    },
  ];

  const FloatingCard = ({ delay, icon: Icon, label, value }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, delay, repeat: Infinity }}
        className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-sage" />
          <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-lg font-bold text-foreground">{value}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-black/40 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sage/30">MM</div>
            <span className="font-heading font-bold text-2xl text-foreground">MealMaster</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <button onClick={() => navigate('/login')} className="text-foreground hover:text-sage transition-colors">Sign In</button>
            <Button onClick={() => navigate('/register')} className="w-auto">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sage/20 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-soft-orange/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-soft-orange/15 text-soft-orange font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Meal Planning</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-foreground">
              Plan Smart. <br />
              <span className="text-gradient">Eat Better.</span> <br />
              Live Healthier.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Your personal AI nutritionist. Generate custom meal plans, track macros seamlessly, and discover delicious recipes tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/register')} size="lg" className="flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
              <Button onClick={() => navigate('/recipes')} variant="outline" size="lg" className="flex items-center justify-center gap-2">
                Explore Recipes
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-sage/30 to-soft-orange/20 rounded-3xl flex items-center justify-center text-8xl animate-pulse">
                🥗
              </div>
            </div>

            <FloatingCard delay={0.5} icon={ChefHat} label="Daily Goal" value="1,850 kcal" />
            <FloatingCard delay={0.7} icon={BarChart3} label="Protein Hit!" value="120g / 140g" />
            <FloatingCard delay={0.9} icon={Heart} label="Streak" value="15 days" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-light-gray dark:bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16">Why choose <span className="text-sage">MealMaster</span>?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-elevated p-8 group hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-6 mx-auto shadow-sm group-hover-scale">
                  <feature.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Loved by Users</h2>
            <p className="text-lg text-muted-foreground">Join thousands who've transformed their eating habits</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-8 hover-lift"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-sage/10 to-soft-orange/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Transform Your Health?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/register')} size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">MM</div>
                <span className="font-bold text-foreground">MealMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">Making healthy eating smarter</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 MealMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

