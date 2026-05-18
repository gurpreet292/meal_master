import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Share2, Plus, Flame } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';

const Community = () => {
  const [liked, setLiked] = useState({});

  const posts = [
    {
      id: 1,
      user: { name: 'Sarah Jenkins', handle: '@sarahj_eats', avatar: '👩‍🍳' },
      image: '🥗',
      caption: 'Just perfected my post-workout protein bowl! 45g of protein and tastes like heaven. #healthyliving #protein',
      likes: 245,
      comments: 18,
      saved: false
    },
    {
      id: 2,
      user: { name: 'Mike Chen', handle: '@mike_cooks', avatar: '👨‍🍳' },
      image: '🍕',
      caption: 'Keto friendly pizza that actually holds together! The secret is the almond flour crust. Who wants the recipe? 🙋',
      likes: 892,
      comments: 104,
      saved: false
    },
    {
      id: 3,
      user: { name: 'Emma Wilson', handle: '@emmas_kitchen', avatar: '👩‍💼' },
      image: '🍱',
      caption: 'Meal prep Sundays hit different! 7 days of balanced nutrition ready to go. Drop a ❤️ if you meal prep too!',
      likes: 567,
      comments: 45,
      saved: false
    }
  ];

  const trendingRecipes = [
    { name: 'High-Protein Pasta', trend: '↑ 125%', icon: '🍝' },
    { name: 'Green Smoothie Bowls', trend: '↑ 98%', icon: '🥣' },
    { name: 'Air Fryer Recipes', trend: '↑ 87%', icon: '🍟' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Community</h1>
        <p className="text-muted-foreground">Share, inspire, and grow with our healthy community</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Share Post */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="text-3xl">👤</div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Share your recipe or meal moment..."
                      className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50"
                    />
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Posts */}
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{post.user.avatar}</div>
                    <div>
                      <p className="font-semibold text-foreground">{post.user.name}</p>
                      <p className="text-xs text-muted-foreground">{post.user.handle}</p>
                    </div>
                  </div>

                  {/* Image/Content */}
                  <div className="w-full h-48 bg-gradient-to-br from-sage/20 to-soft-orange/10 rounded-lg flex items-center justify-center text-6xl mb-4">
                    {post.image}
                  </div>

                  {/* Caption */}
                  <p className="text-foreground mb-4">{post.caption}</p>

                  {/* Stats */}
                  <div className="flex gap-6 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 justify-around">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setLiked(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className="flex items-center gap-2 text-muted-foreground hover:text-soft-orange transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${liked[post.id] ? 'fill-current' : ''}`} />
                      Like
                    </motion.button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-sage transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      Comment
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                      <Bookmark className="w-5 h-5" />
                      Save
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-sage transition-colors">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-4">🔥 Trending Recipes</h3>
                <div className="space-y-3">
                  {trendingRecipes.map((recipe, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="p-3 bg-gradient-sage rounded-lg cursor-pointer hover:bg-sage/20 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{recipe.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{recipe.name}</p>
                          <p className="text-xs text-sage">{recipe.trend}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-primary">
              <CardContent className="pt-6 text-white">
                <h3 className="font-bold mb-3">💡 Community Tip</h3>
                <p className="text-sm leading-relaxed">
                  Share your successful recipes and meal preps! You never know who might find them inspiring.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;
