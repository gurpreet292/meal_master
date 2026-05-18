import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, X, Clock, Flame, Droplets, Leaf, Filter, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const RECIPE_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23e8f5e9"/><stop offset="100%" stop-color="%23d8f3dc"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23g)"/><circle cx="980" cy="150" r="120" fill="%23b7e4c7" opacity="0.45"/><circle cx="230" cy="680" r="160" fill="%2395d5b2" opacity="0.35"/><text x="50%" y="47%" dominant-baseline="middle" text-anchor="middle" font-size="84" font-family="Arial, sans-serif" fill="%232f5d3a">MealMaster Recipe</text><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="34" font-family="Arial, sans-serif" fill="%234f7a58">Tasty. Balanced. Ready to cook.</text></svg>';

const RecipesNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'high-protein', label: 'High Protein', icon: '💪' },
    { id: 'low-carb', label: 'Low Carb', icon: '🥗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten Free', icon: '🌾' },
    { id: 'quick', label: 'Quick (< 30m)', icon: '⚡' },
    { id: 'weight-loss', label: 'Weight Loss', icon: '📉' },
  ];

  const { recipes: appRecipes } = useApp();

  // Enhanced recipe data with filtering support
  const recipes = useMemo(() => 
    appRecipes.map((r, i) => ({
      id: r.id || i,
      name: r.name,
      description: r.description || 'Delicious and nutritious meal',
      calories: r.calories || 350,
      protein: r.protein || 20,
      carbs: r.carbs || 30,
      fat: r.fat || 12,
      time: Number.parseInt(r.time, 10) || 20,
      rating: r.rating || 4.6,
      tags: r.tags || ['healthy', 'quick'],
      image: r.image || RECIPE_FALLBACK_IMAGE,
      ingredients: r.ingredients || ['ingredient 1', 'ingredient 2', 'ingredient 3'],
      instructions: r.instructions || 'Easy to prepare. Perfect for meal prep!',
    }))
  , [appRecipes]);

  // Filter and search recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (selectedFilters.length === 0) return matchesSearch;
      
      const matchesFilters = selectedFilters.some(filter => {
        switch(filter) {
          case 'high-protein': return recipe.protein >= 25;
          case 'low-carb': return recipe.carbs <= 40;
          case 'vegan': return recipe.tags?.includes('vegan');
          case 'gluten-free': return recipe.tags?.includes('gluten-free');
          case 'quick': return recipe.time <= 30;
          case 'weight-loss': return recipe.calories <= 400;
          default: return true;
        }
      });
      
      return matchesSearch && matchesFilters;
    });
  }, [recipes, searchTerm, selectedFilters]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-green-700" />
            Recipe Collection
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Discover delicious recipes tailored to your preferences</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm sm:text-base"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-green-700 hover:text-green-800 transition"
          >
            <Filter className="w-4 h-4" />
            {selectedFilters.length > 0 ? `Filters (${selectedFilters.length})` : 'Show Filters'}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2"
              >
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilters(prev =>
                      prev.includes(filter.id) ? prev.filter(f => f !== filter.id) : [...prev, filter.id]
                    )}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedFilters.includes(filter.id)
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-white border border-border text-foreground hover:border-green-700'
                    }`}
                  >
                    {filter.icon} {filter.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Info */}
        <p className="text-sm text-muted-foreground">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </p>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="group cursor-pointer"
              >
                <div className="card-elevated overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-linear-to-br from-green-100 to-green-50">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = RECIPE_FALLBACK_IMAGE;
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.includes(recipe.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-base sm:text-lg text-foreground mb-2 line-clamp-2">
                      {recipe.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                      {recipe.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span>{recipe.time}m</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{recipe.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span>{recipe.protein}g</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground text-yellow-600">
                        <span>⭐ {recipe.rating}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button size="sm" className="w-full mt-auto text-xs sm:text-sm">
                      View Recipe
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <p className="text-muted-foreground text-sm sm:text-base mb-2">No recipes found</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecipe(null)}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="sticky top-0 bg-white border-b border-border flex items-center justify-between p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{selectedRecipe.name}</h2>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Image */}
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 sm:h-80 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src = RECIPE_FALLBACK_IMAGE;
                  }}
                />

                {/* Nutrition Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-lg sm:text-xl font-bold text-orange-600">{selectedRecipe.calories}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">{selectedRecipe.protein}g</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-lg sm:text-xl font-bold text-green-600">{selectedRecipe.carbs}g</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-lg sm:text-xl font-bold text-red-600">{selectedRecipe.fat}g</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{selectedRecipe.description}</p>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients?.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-foreground">{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">Instructions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedRecipe.instructions}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg">
                    Add to Meal Plan
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                    className={favorites.includes(selectedRecipe.id) ? 'border-red-500 text-red-500' : ''}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedRecipe.id) ? 'fill-current' : ''}`} />
                  </Button>
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
