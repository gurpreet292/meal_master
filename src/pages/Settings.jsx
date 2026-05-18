import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Moon, Sun, Monitor, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const sections = [
    {
      title: 'Account',
      icon: User,
      settings: [
        { name: 'Profile', description: 'Update your name and photo' },
        { name: 'Email & Password', description: 'Change your login credentials' },
        { name: 'Dietary Preferences', description: 'Update your dietary restrictions' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Meal Reminders', description: 'Get reminders for your meals', toggle: true },
        { name: 'Weekly Reports', description: 'Receive your weekly summary', toggle: true },
        { name: 'Tips & Articles', description: 'Get health tips in your inbox', toggle: false }
      ]
    },
    {
      title: 'Appearance',
      icon: Moon,
      settings: [
        { name: 'Theme', description: 'Choose your preferred theme', options: ['Light', 'Dark', 'System'] }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">Gurpreet Singh</p>
                  <p className="text-sm text-muted-foreground">gurpreet@example.com</p>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Sections */}
      {sections.map((section, sectionIdx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + sectionIdx * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="w-5 h-5 text-sage" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {section.settings.map((setting, idx) => (
                <motion.div
                  key={setting.name}
                  whileHover={{ x: 4 }}
                  className="p-3 rounded-lg hover:bg-card transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{setting.name}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  {setting.toggle ? (
                    <div className="w-10 h-6 bg-sage/30 rounded-full flex items-center p-1">
                      <motion.div
                        initial={false}
                        animate={{ x: setting.name === 'Meal Reminders' ? 16 : 0 }}
                        className="w-4 h-4 bg-sage rounded-full"
                      />
                    </div>
                  ) : setting.options ? (
                    <select className="bg-background border border-border rounded-lg px-2 py-1 text-sm">
                      {setting.options.map(opt => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="danger" className="w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
            <Button variant="danger" className="w-full flex items-center justify-center gap-2">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;
