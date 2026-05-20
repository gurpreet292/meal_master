import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Share2, Plus, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

const Community = () => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  const posts = [
    {
      id: 1,
      user: { name: 'Sarah Jenkins', handle: '@sarah_wellness', avatar: 'bg-sage-main/20 text-sage-dark' },
      image: '/salmon_wrap_topdown_1779170173897.png',
      aspectRatio: 'aspect-[4/5]',
      caption: 'Just perfected my cortisol-balancing salmon wrap! Rich in Omega-3s and absolutely delicious. 🌿✨ #wellness #healthy',
      likes: 1245,
      comments: 89,
    },
    {
      id: 2,
      user: { name: 'David Chen', handle: '@david_cooks', avatar: 'bg-orange-100 text-orange-600' },
      image: '/berry_quinoa_topdown_1779170262202.png',
      aspectRatio: 'aspect-square',
      caption: 'Berry Quinoa Bowl for the morning energy boost without the crash. The secret is soaking the quinoa overnight!',
      likes: 892,
      comments: 42,
    },
    {
      id: 3,
      user: { name: 'Emma Wilson', handle: '@emmas_kitchen', avatar: 'bg-sage-dark/10 text-sage-dark' },
      image: '/scrambled_eggs_topdown_1779170230608.png',
      aspectRatio: 'aspect-[3/4]',
      caption: 'Sunday meal prep complete! Keeping it simple with protein-rich scrambled eggs and matcha lattes. 🍵',
      likes: 2156,
      comments: 156,
    },
    {
      id: 4,
      user: { name: 'Maya Patel', handle: '@maya_glow', avatar: 'bg-cream-border text-sage-dark' },
      image: '/salmon_wrap_topdown_1779170173897.png', // reusing image for masonry demo
      aspectRatio: 'aspect-[16/9]',
      caption: 'Quick lunch between meetings. Remember to breathe and eat mindfully!',
      likes: 432,
      comments: 12,
    }
  ];

  const trendingCreators = [
    { name: 'Elena Rostova', role: 'Nutritionist', followers: '124k', avatar: 'ER' },
    { name: 'Marcus Bell', role: 'Chef', followers: '89k', avatar: 'MB' },
    { name: 'Sofia Lin', role: 'Wellness Coach', followers: '210k', avatar: 'SL' },
  ];

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSave = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-cream-base pb-20 font-sans">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-cream-base/80 backdrop-blur-xl border-b border-cream-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-2xl border border-cream-border bg-white/70 px-3 py-2 hover:bg-white transition-colors"
              aria-label="Go to home page"
            >
              <div className="w-10 h-10 rounded-xl bg-sage/15 border border-sage/20 flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src="/media__1779169959032.png"
                  alt="MealMaster logo"
                  className="w-7 h-7 rounded-md object-cover"
                />
              </div>
              <span className="hidden sm:inline text-sm font-semibold text-sage-dark group-hover:text-sage-main transition-colors">
                MealMaster Home
              </span>
            </Link>
            <div>
              <h1 className="text-4xl font-serif italic text-sage-dark tracking-tight">Community</h1>
              <p className="text-sage-muted text-sm mt-1">Connect, share, and grow together</p>
            </div>
          </div>
          <Button className="bg-sage-main hover:bg-sage-dark text-white rounded-full flex items-center gap-2 shadow-lg shadow-sage-main/20">
            <Plus className="w-5 h-5" /> New Post
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Main Feed (Masonry) */}
        <div className="w-full lg:w-2/3">
          
          {/* Share Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="bg-white/60 backdrop-blur-md border border-cream-border rounded-[2rem] p-4 flex gap-4 shadow-sm items-center transition-shadow focus-within:shadow-md focus-within:border-sage-light">
              <div className="w-12 h-12 rounded-full bg-sage-dark text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                You
              </div>
              <input
                type="text"
                placeholder="Share your latest healthy creation..."
                className="flex-1 bg-transparent border-none outline-none text-sage-dark placeholder:text-sage-light px-2"
              />
              <button className="p-3 bg-sage-main/10 text-sage-main hover:bg-sage-main hover:text-white rounded-xl transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Pinterest-style Masonry Grid */}
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="break-inside-avoid bg-white rounded-[2rem] border border-cream-border overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                {/* Image Container with hover zoom */}
                <div className={`relative w-full ${post.aspectRatio} overflow-hidden bg-cream-border`}>
                  <img src={post.image} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  
                  {/* Glassmorphism Overlays on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-[-10px] group-hover:translate-y-0">
                    <button 
                      onClick={() => toggleSave(post.id)}
                      className="p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 ${saved[post.id] ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${post.user.avatar}`}>
                      {post.user.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sage-dark text-sm">{post.user.name}</p>
                      <p className="text-xs text-sage-light">{post.user.handle}</p>
                    </div>
                  </div>

                  <p className="text-sage-muted text-sm leading-relaxed mb-6">
                    {post.caption}
                  </p>

                  {/* Engagement Bar */}
                  <div className="flex items-center justify-between text-sage-light pt-4 border-t border-cream-border">
                    <div className="flex gap-4">
                      <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 hover:text-orange-500 transition-colors group/btn">
                        <Heart className={`w-5 h-5 ${liked[post.id] ? 'fill-orange-500 text-orange-500' : 'group-hover/btn:fill-orange-500/20'}`} />
                        <span className={`text-xs font-semibold ${liked[post.id] ? 'text-orange-500' : ''}`}>{post.likes + (liked[post.id] ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-sage-main transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-semibold">{post.comments}</span>
                      </button>
                    </div>
                    <button className="hover:text-sage-dark transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          
          {/* Trending Recipes Widget */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white/60 backdrop-blur-md border border-cream-border rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sage-dark text-lg">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {['Matcha Overnight Oats', 'High-Protein Lemon Pasta', 'Keto Avocado Bowls'].map((item, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-3 rounded-xl hover:bg-cream-base transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-bold text-sage-light group-hover:text-sage-main transition-colors">0{idx + 1}</div>
                      <p className="font-semibold text-sage-dark text-sm">{item}</p>
                    </div>
                    <Flame className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Creators to Follow */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-sage-dark rounded-[2rem] p-6 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-serif italic font-bold text-2xl mb-6">Inspiring Creators</h3>
              
              <div className="space-y-5">
                {trendingCreators.map((creator, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white border border-white/10 group-hover:border-white/40 transition-colors">
                        {creator.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{creator.name}</p>
                        <p className="text-xs text-sage-light/80">{creator.role} • {creator.followers}</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-sage-dark text-xs font-bold transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default Community;
