import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Sparkles, ArrowRight, Activity, Flame, Droplets, Utensils, Star, Heart } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Yoga Instructor', text: 'MealMaster brought peace back to my kitchen. The cortisol-friendly recommendations are spot on.', avatar: 'bg-sage-main/20' },
    { name: 'David Chen', role: 'Product Designer', text: 'Finally, an app that looks as good as the food it suggests. The UI is incredibly calming and intuitive.', avatar: 'bg-sage-dark/20' },
    { name: 'Emma Wilson', role: 'Working Mom', text: 'It completely changed how I meal prep. I save hours every week, and we are eating healthier than ever.', avatar: 'bg-cream-border' },
  ];

  return (
    <div className="min-h-screen bg-cream-base overflow-hidden font-sans text-sage-dark selection:bg-sage-main selection:text-white">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-sage-light/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-sage-main/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cream-base/60 backdrop-blur-xl border-b border-cream-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-sage-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sage-dark/20">M</div>
            <span className="font-serif italic font-bold text-2xl tracking-tight text-sage-dark">MealMaster</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="text-sage-muted hover:text-sage-dark transition-colors">Features</a>
            <a href="#testimonials" className="text-sage-muted hover:text-sage-dark transition-colors">Testimonials</a>
            <button onClick={() => navigate('/login')} className="text-sage-dark hover:text-sage-main transition-colors font-semibold">Sign In</button>
            <Button onClick={() => navigate('/register')} className="bg-sage-main hover:bg-sage-dark text-white rounded-full px-6 py-2 shadow-lg shadow-sage-main/20 transition-all">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light/30 border border-sage-light text-sage-dark font-medium mb-8 text-sm"
            >
              <Sparkles className="w-4 h-4 text-sage-main" />
              <span>AI-Powered Wellness & Nutrition</span>
            </motion.div>
            
            <h1 className="text-6xl lg:text-7xl font-serif italic font-bold leading-[1.1] tracking-tight mb-6 text-sage-dark drop-shadow-sm">
              Nourish Your Body. <br />
              <span className="text-sage-main">Calm Your Mind.</span>
            </h1>
            
            <p className="text-xl text-sage-muted mb-10 leading-relaxed font-light">
              Experience the first premium meal planning platform designed to balance your macros, reduce cortisol, and elevate your daily energy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/register')} className="bg-sage-dark hover:bg-sage-dark/90 text-white rounded-full py-7 px-8 text-lg shadow-xl shadow-sage-dark/20 flex items-center justify-center gap-2 group transition-all">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={() => navigate('/recipes')} variant="outline" className="border-sage-light text-sage-dark hover:bg-cream-border rounded-full py-7 px-8 text-lg flex items-center justify-center gap-2 transition-all bg-white/50 backdrop-blur-sm">
                Explore Recipes
              </Button>
            </div>
          </motion.div>

          {/* Hero Visuals - Cinematic Bento Layout */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative h-[600px] w-full"
            style={{ y }}
          >
            {/* Main Image Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="absolute top-10 right-10 w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl shadow-sage-dark/10 border-4 border-white/40 z-10"
            >
              <img src="/salmon_wrap_topdown_1779170173897.png" alt="Healthy Meal" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-serif italic text-2xl">Smoked Salmon Wrap</h3>
                <p className="text-white/80 text-sm">Rich in Omega-3 for brain health</p>
              </div>
            </motion.div>

            {/* Floating Stat Card 1 */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-0 w-48 bg-white/80 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl shadow-sage-dark/5 z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-sage-main/10 rounded-xl text-sage-main"><Flame className="w-5 h-5" /></div>
                <span className="text-sm font-semibold text-sage-muted">Daily Goal</span>
              </div>
              <div className="text-2xl font-bold text-sage-dark">1,850 <span className="text-sm font-medium text-sage-light">kcal</span></div>
              <div className="w-full bg-cream-border h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-sage-main w-[70%] h-full rounded-full" />
              </div>
            </motion.div>

            {/* Floating Stat Card 2 */}
            <motion.div 
              animate={{ y: [10, -10, 10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-10 w-56 bg-white/80 backdrop-blur-xl border border-white p-5 rounded-3xl shadow-xl shadow-sage-dark/5 z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-sage-main/10 rounded-xl text-sage-main"><Activity className="w-5 h-5" /></div>
                <span className="text-sm font-semibold text-sage-muted">Wellness Score</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-serif italic font-bold text-sage-dark">94</div>
                <div className="text-sage-main text-sm font-medium mb-1">Excellent ↑</div>
              </div>
            </motion.div>

            {/* Background Accent Image */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-0 right-0 w-64 h-64 rounded-full overflow-hidden shadow-2xl shadow-sage-dark/20 border-8 border-cream-base z-0"
            >
              <img src="/berry_quinoa_topdown_1779170262202.png" alt="Berry Bowl" className="w-full h-full object-cover" />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-sage-dark mb-6">Designed for Your Wellbeing</h2>
            <p className="text-lg text-sage-muted">A harmonious blend of AI intelligence and holistic health principles, crafted to make nutrition effortless.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 bg-white/60 backdrop-blur-lg border border-cream-border p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group"
            >
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-sage-light/20 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="w-14 h-14 bg-sage-main text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sage-main/20">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-sage-dark mb-3">Intelligent Meal Planning</h3>
              <p className="text-sage-muted text-lg max-w-md">Our AI curates weekly meal plans that balance your macros, respect your dietary preferences, and actually taste incredible.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-sage-dark text-white p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Holistic Tracking</h3>
              <p className="text-sage-light/80 text-lg">Go beyond simple calories. Track how your food affects your mood, energy, and overall wellness score.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white/60 backdrop-blur-lg border border-cream-border p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-sage-main/10 text-sage-main rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-sage-dark mb-3">Cortisol-Conscious</h3>
              <p className="text-sage-muted text-lg">Recipes designed to stabilize blood sugar and reduce stress hormones.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-gradient-to-r from-sage-light/20 to-cream-border/50 border border-cream-border p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white text-sage-main rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-sage-dark mb-3">Pristine Analytics</h3>
                <p className="text-sage-muted text-lg max-w-sm">Beautiful, calming charts that make understanding your nutrition an absolute joy, not a chore.</p>
              </div>
              <div className="hidden md:block w-48 h-48 relative">
                {/* Decorative Chart elements */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-white" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="60" fill="none" className="text-sage-main" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6 relative z-10 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-sage-dark mb-4">Community Love</h2>
            <p className="text-lg text-sage-muted">Join thousands living their healthiest lives.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-cream-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-sage-main text-sage-main" />)}
                  </div>
                  <p className="text-sage-dark font-medium leading-relaxed mb-8 text-lg">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-sage-dark font-bold`}>
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sage-dark">{testimonial.name}</h4>
                    <p className="text-sm text-sage-muted">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-sage-dark text-white rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-light/10 rounded-full blur-3xl" />
          
          <h2 className="text-4xl md:text-6xl font-serif italic font-bold mb-6 relative z-10">Ready to feel better?</h2>
          <p className="text-xl text-sage-light/90 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Join MealMaster today and let AI curate the perfect wellness journey for your unique body and mind.
          </p>
          <Button onClick={() => navigate('/register')} className="!bg-white !text-sage-dark hover:!bg-cream-base hover:!text-sage-dark rounded-full py-8 px-10 text-xl font-bold shadow-xl flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105 relative z-10">
            Start Your Free Trial <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </section>

    </div>
  );
};

export default Landing;
