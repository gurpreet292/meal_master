import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { user, updateProfile } = useApp();

  const steps = [
    {
      title: "What's your primary goal?",
      key: 'goal',
      options: [
        { id: "lose", label: "Lose Weight", emoji: "📉" },
        { id: "maintain", label: "Maintain Weight", emoji: "⚖️" },
        { id: "gain", label: "Build Muscle", emoji: "💪" },
        { id: "health", label: "Eat Healthier", emoji: "🥗" }
      ]
    },
    {
      title: "Any dietary preferences?",
      key: 'diet',
      options: [
        { id: "none", label: "No Restrictions", emoji: "🍽️" },
        { id: "vegan", label: "Vegan", emoji: "🌱" },
        { id: "vegetarian", label: "Vegetarian", emoji: "🥕" },
        { id: "keto", label: "Keto", emoji: "🥓" },
        { id: "gluten", label: "Gluten Free", emoji: "🌾" },
      ]
    },
    {
      title: "Allergies or intolerances?",
      key: 'allergies',
      options: [
        { id: "none", label: "None", emoji: "✓" },
        { id: "dairy", label: "Dairy", emoji: "🥛" },
        { id: "nuts", label: "Nuts", emoji: "🥜" },
        { id: "shellfish", label: "Shellfish", emoji: "🦐" },
        { id: "eggs", label: "Eggs", emoji: "🥚" },
      ]
    },
    {
      title: "How active are you?",
      key: 'activity',
      options: [
        { id: "sedentary", label: "Sedentary", emoji: "💤" },
        { id: "light", label: "Lightly Active", emoji: "🚶" },
        { id: "moderate", label: "Moderately Active", emoji: "🏃" },
        { id: "very", label: "Very Active", emoji: "⚡" },
      ]
    },
    {
      title: "What's your daily calorie goal?",
      key: 'calories',
      options: [
        { id: "1500", label: "1,500 calories", emoji: "🔥" },
        { id: "1800", label: "1,800 calories", emoji: "🔥" },
        { id: "2000", label: "2,000 calories", emoji: "🔥🔥" },
        { id: "2500", label: "2,500 calories", emoji: "🔥🔥" },
      ]
    }
  ];

  const currentStep = steps[step];

  const handleSelect = (optionId) => {
    setAnswers({ ...answers, [currentStep.key]: optionId });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save answers to user profile prefs
      try {
        if (user) {
          updateProfile({ preferences: { ...(user.preferences || {}), ...answers } });
        }
      } catch (e) {
        console.warn('Could not update profile:', e.message);
      }
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-foreground">Step {step + 1} of {steps.length}</h2>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-primary rounded-full"
            />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {currentStep.title}
              </h1>
              <p className="text-muted-foreground">
                Step {step + 1} of {steps.length}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {currentStep.options.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(option.id)}
                  className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
                    answers[currentStep.key] === option.id
                      ? 'border-sage bg-sage/10'
                      : 'border-border hover:border-sage'
                  }`}
                >
                  <div className="text-4xl mb-3">{option.emoji}</div>
                  <div className="text-sm font-medium text-foreground text-left">{option.label}</div>
                  {answers[currentStep.key] === option.id && (
                    <motion.div
                      layoutId="selected"
                      className="absolute top-2 right-2 w-6 h-6 bg-sage rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleBack}
            disabled={step === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            size="lg"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleNext}
            disabled={!answers[currentStep.key]}
          >
            {step === steps.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Skip */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
