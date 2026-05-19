import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, X, Clock, Flame, Droplets, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const RECIPE_FALLBACK_IMAGE = '/salmon_wrap_topdown_1779170173897.png';

const RecipesNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filters = [
    { id: 'high-protein', label: 'High Protein' },
    { id: 'low-carb', label: 'Low Carb' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'quick', label: 'Under 30m' },
  ];

  const { recipes: appRecipes } = useApp();

  const recipes = useMemo(() => 
    appRecipes.map((r, i) => ({
      id: r.id || i,
      name: r.name,
      description: r.description || 'Delicious and nutritious meal, perfect for any time of day. High in essential nutrients.',
      calories: r.calories || 350,
      protein: r.protein || 20,
      carbs: r.carbs || 30,
      fat: r.fat || 12,
      time: Number.parseInt(r.time, 10) || 20,
      rating: r.rating || 4.6,
      tags: r.tags || ['healthy', 'quick'],
      image: r.image || RECIPE_FALLBACK_IMAGE,
      ingredients: r.ingredients || ['Fresh spinach', 'Cherry tomatoes', 'Olive oil', 'Sea salt', 'Cracked black pepper'],
      instructions: r.instructions || '1. Preheat your pan over medium heat.\n2. Add the ingredients gently.\n3. Sauté until golden brown.\n4. Serve immediately with a garnish of fresh herbs.',
    }))
  , [appRecipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (selectedFilters.length === 0) return matchesSearch;
      
      const matchesFilters = selectedFilters.some(filter => {
        switch(filter) {
          case 'high-protein': return recipe.protein >= 25;
          case 'low-carb': return recipe.carbs <= 40;
          case 'vegan': return recipe.tags?.includes('vegan');
          case 'quick': return recipe.time <= 30;
          default: return true;
        }
      });
      return matchesSearch && matchesFilters;
    });
  }, [recipes, searchTerm, selectedFilters]);

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-cream-base dark:bg-background pb-20 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-serif italic text-sage-dark dark:text-sage-light tracking-tight">
            Curated Recipes
          </h1>
          <p className="text-sage-muted dark:text-muted-foreground text-lg">
            Nourishing, cortisol-conscious meals designed to elevate your energy and calm your mind.
          </p>

          <div className="relative max-w-lg mx-auto pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-light" />
            <input
              type="text"
              placeholder="Search by ingredient, dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-cream-border dark:border-border rounded-full py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-main transition-all text-sm shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilters(prev => prev.includes(filter.id) ? prev.filter(f => f !== filter.id) : [...prev, filter.id])}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
                  selectedFilters.includes(filter.id)
                    ? 'bg-sage-main text-white shadow-md'
                    : 'bg-transparent border border-sage-light text-sage-main hover:bg-sage-main/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recipe Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRecipes.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => setSelectedRecipe(recipe)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-cream-border mb-6">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                  className="absolute top-4 right-4 p-3 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'fill-white text-white' : 'text-white'}`} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-between items-end">
                  <div className="flex gap-3 text-white text-sm font-medium">
                    <span className="flex items-center gap-1 backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full"><Clock className="w-4 h-4"/> {recipe.time}</span>
                    <span className="flex items-center gap-1 backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full"><Flame className="w-4 h-4"/> {recipe.calories}</span>
                  </div>
                </div>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-serif text-2xl font-bold text-sage-dark dark:text-sage-light leading-tight group-hover:text-sage-main transition-colors">
                    {recipe.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-sage-light group-hover:text-sage-main transition-colors group-hover:translate-x-1 flex-shrink-0" />
                </div>
                <p className="text-sm text-sage-muted dark:text-muted-foreground line-clamp-2">
                  {recipe.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Split-Screen Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-cream-base/80 dark:bg-black/60 backdrop-blur-md" onClick={() => setSelectedRecipe(null)} />
            
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 md:right-auto md:left-4 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedRecipe.image} alt={selectedRecipe.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="max-w-md mx-auto space-y-8">
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {selectedRecipe.tags?.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-sage-main bg-sage-main/10 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-sage-dark dark:text-sage-light mb-4 leading-tight">{selectedRecipe.name}</h2>
                    <p className="text-sage-muted dark:text-muted-foreground leading-relaxed">{selectedRecipe.description}</p>
                  </div>

                  {/* Macros Grid */}
                  <div className="grid grid-cols-4 gap-4 py-6 border-y border-cream-border dark:border-border">
                    <div className="text-center">
                      <div className="text-xl font-bold text-sage-dark dark:text-foreground">{selectedRecipe.calories}</div>
                      <div className="text-xs text-sage-light uppercase tracking-wider mt-1">Cal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-sage-dark dark:text-foreground">{selectedRecipe.protein}g</div>
                      <div className="text-xs text-sage-light uppercase tracking-wider mt-1">Pro</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-sage-dark dark:text-foreground">{selectedRecipe.carbs}g</div>
                      <div className="text-xs text-sage-light uppercase tracking-wider mt-1">Carb</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-sage-dark dark:text-foreground">{selectedRecipe.fat}g</div>
                      <div className="text-xs text-sage-light uppercase tracking-wider mt-1">Fat</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-sage-dark dark:text-sage-light mb-4">Ingredients</h3>
                    <ul className="space-y-3">
                      {selectedRecipe.ingredients?.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-sage-muted dark:text-muted-foreground border-b border-cream-border/50 pb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-sage-main" /> {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-sage-dark dark:text-sage-light mb-4">Instructions</h3>
                    <div className="text-sm text-sage-muted dark:text-muted-foreground leading-loose whitespace-pre-line">
                      {selectedRecipe.instructions}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button className="flex-1 bg-sage-dark hover:bg-sage-dark/90 text-white rounded-full py-6 text-lg shadow-lg shadow-sage-dark/20">
                      Add to Planner
                    </Button>
                    <button 
                      onClick={() => toggleFavorite(selectedRecipe.id)}
                      className="p-4 rounded-full border border-sage-light hover:bg-cream-base transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${favorites.includes(selectedRecipe.id) ? 'fill-sage-main text-sage-main' : 'text-sage-dark'}`} />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipesNew;
