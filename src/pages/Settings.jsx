import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Moon, Sun, Monitor, LogOut, ChevronRight, Mail, Key, Activity, Heart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [toggles, setToggles] = useState({
    mealReminders: true,
    weeklyReports: true,
    healthTips: false,
    publicProfile: false,
    syncAppleHealth: true,
  });

  const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { name: 'Personal Information', desc: 'Update your name and photo', icon: User },
        { name: 'Email & Password', desc: 'Security and login credentials', icon: Key },
        { name: 'Dietary Preferences', desc: 'Allergies and macro targets', icon: Heart },
      ]
    },
    {
      title: 'Notifications & Alerts',
      icon: Bell,
      items: [
        { name: 'Meal Reminders', desc: 'Push notifications for meal times', isToggle: true, toggleKey: 'mealReminders' },
        { name: 'Weekly Reports', desc: 'Email summary of your wellness score', isToggle: true, toggleKey: 'weeklyReports' },
        { name: 'Health Tips', desc: 'Daily cortisol-lowering advice', isToggle: true, toggleKey: 'healthTips' },
      ]
    },
    {
      title: 'Integrations & Privacy',
      icon: Shield,
      items: [
        { name: 'Apple Health / Google Fit', desc: 'Sync your daily activity', isToggle: true, toggleKey: 'syncAppleHealth' },
        { name: 'Public Profile', desc: 'Allow others to see your recipes', isToggle: true, toggleKey: 'publicProfile' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-base pb-20 font-sans">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-cream-base/80 backdrop-blur-xl border-b border-cream-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-serif italic text-sage-dark tracking-tight">Settings</h1>
          <p className="text-sage-muted text-sm mt-1">Manage your wellness journey</p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Profile Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-white rounded-[2.5rem] border border-cream-border p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage-light/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-sage-main text-white flex items-center justify-center text-4xl font-bold shadow-xl shadow-sage-main/30">
                  GS
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-cream-border text-sage-dark hover:text-sage-main transition-colors shadow-sm">
                  <User className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-sage-dark">Gurpreet Singh</h2>
                <p className="text-sage-muted">gurpreet@example.com</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-sage-main/10 text-sage-main text-xs font-bold rounded-full uppercase tracking-wider">Pro Member</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider">High Protein</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full border-sage-light text-sage-dark hover:bg-cream-base">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-8">
            {sections.slice(0, 2).map((section, idx) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}>
                <div className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-cream-border p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-sage-main/10 rounded-xl text-sage-main">
                      <section.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sage-dark text-lg">{section.title}</h3>
                  </div>

                  <div className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-cream-base transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          {item.icon && <item.icon className="w-5 h-5 text-sage-light group-hover:text-sage-main transition-colors" />}
                          <div>
                            <p className="font-semibold text-sage-dark text-sm">{item.name}</p>
                            <p className="text-xs text-sage-muted">{item.desc}</p>
                          </div>
                        </div>
                        
                        {item.isToggle ? (
                          <button 
                            onClick={() => handleToggle(item.toggleKey)}
                            className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${toggles[item.toggleKey] ? 'bg-sage-main' : 'bg-cream-border'}`}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: toggles[item.toggleKey] ? 24 : 0 }}
                              className="w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                          </button>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-sage-light group-hover:text-sage-main transition-colors" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-cream-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-sage-main/10 rounded-xl text-sage-main">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sage-dark text-lg">{sections[2].title}</h3>
                </div>

                <div className="space-y-2">
                  {sections[2].items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-cream-base transition-colors cursor-pointer">
                      <div>
                        <p className="font-semibold text-sage-dark text-sm">{item.name}</p>
                        <p className="text-xs text-sage-muted">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => handleToggle(item.toggleKey)}
                        className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${toggles[item.toggleKey] ? 'bg-sage-main' : 'bg-cream-border'}`}
                      >
                        <motion.div 
                          initial={false}
                          animate={{ x: toggles[item.toggleKey] ? 24 : 0 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-cream-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-sage-main/10 rounded-xl text-sage-main">
                    <Moon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sage-dark text-lg">Appearance</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {['Light', 'Dark', 'System'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode.toLowerCase())}
                      className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        theme === mode.toLowerCase() 
                          ? 'border-sage-main bg-sage-main/5 text-sage-main shadow-sm' 
                          : 'border-cream-border text-sage-muted hover:border-sage-light hover:bg-white'
                      }`}
                    >
                      {mode === 'Light' ? <Sun className="w-5 h-5" /> : mode === 'Dark' ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                      <span className="text-xs font-bold">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="bg-red-50/50 backdrop-blur-md rounded-[2rem] border border-red-100 p-6 shadow-sm">
                <h3 className="font-bold text-red-600 text-lg mb-4">Danger Zone</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl h-12">
                    <span className="font-semibold">Sign Out</span>
                    <LogOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl h-12">
                    <span className="font-semibold">Delete Account</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
