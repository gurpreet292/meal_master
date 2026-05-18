# MealMaster - Premium UI/UX Design Guide

## 🎨 Design Philosophy

MealMaster's design embodies a premium, cozy, and motivating aesthetic that makes healthy eating feel achievable and enjoyable. The interface combines the organizational elegance of Notion, the visual appeal of Pinterest, the detailed tracking of MyFitnessPal, and the minimalism of Apple Health.

---

## 📐 Design System

### Color Palette

```
Primary (Sage Green):     #7BAE7F
├─ Light:  #A5C8A7
└─ Dark:   #588B5C

Accent (Soft Orange):     #FFB86B
Accent (Sky Blue):        #88CCF1
Background (Cream):       #F8F6F1
Foreground (Charcoal):    #2D2D2D
Border:                   #E8E6E1
Muted Text:               #6B7280
```

### Typography

**Headings**: Poppins or Sora (Bold, Semibold)
**Body**: Inter (Regular, Medium)

- H1: 36-48px, Bold
- H2: 28-36px, Semibold
- H3: 20-28px, Semibold
- Body: 14-16px, Regular
- Caption: 12px, Regular

### Spacing

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius

- Default: 12px
- Card: 20px
- Button: 24px (pill)
- Input: 12px

### Shadows

```
soft:     0 4px 20px rgba(0,0,0,0.08)
soft-lg:  0 8px 32px rgba(0,0,0,0.12)
soft-xl:  0 16px 48px rgba(0,0,0,0.15)
```

---

## 🎭 Component Library

### Button States

**Default** (Sage Green)
- Rest: bg-sage text-white
- Hover: bg-sage-dark (scale 1.02)
- Active: scale 0.98
- Disabled: opacity-50

**Secondary** (Soft Orange)
- Rest: bg-soft-orange text-white
- Hover: brightness 110%

**Outline**
- Rest: border-2 border-sage text-sage
- Hover: bg-sage/10

**Ghost**
- Rest: transparent text-sage
- Hover: bg-sage/10

### Card Interactions

- Normal: soft-shadow, border border-border
- Hover: soft-shadow-lg, scale 1.02 (if hover=true)
- Active: scale 1.01

### Input Fields

- Rest: bg-input border-border
- Focus: ring-2 ring-sage focus:border-transparent
- Disabled: opacity-50 cursor-not-allowed

---

## 📊 Data Visualization

### Progress Ring (Circular)

- Shows percentage with animated stroke
- Colors: Sage (green), Orange, Red
- Size: 120px (customizable)
- Smooth animation: 1s ease-out

### Macro Bars (Linear)

- Shows: Label | Current/Max | Unit
- Colors: Orange (protein), Sage (carbs), Blue (fat)
- Animated width on mount
- Each bar: height 12px, border-radius 8px

### Charts (Recharts)

- Grid: subtle border-color
- Labels: muted-foreground
- Tooltip: Card-styled background
- Animations: smooth transitions

---

## 🎬 Animation Patterns

### Page Transitions

```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Stagger Lists

```javascript
variants={{
  container: { staggerChildren: 0.1 },
  item: { ... }
}}
```

### Hover Effects

```javascript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Floating Elements

```javascript
animate={{ y: [-10, 10, -10] }}
transition={{ duration: 4, repeat: Infinity }}
```

---

## 📱 Responsive Breakpoints

- Mobile: < 640px (full-width, single column)
- Tablet: 640px - 1024px (2 columns, adjusted spacing)
- Desktop: > 1024px (3+ columns, full sidebar)

**Layout Patterns**:
- Dashboard: lg:col-span-2 + sidebar
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Modals: max-w-md for small screens

---

## 🌙 Dark Mode

- Automatically applied with `dark:` prefix
- Background: 0 0% 8% (almost black)
- Card: 0 0% 13%
- Text: 0 0% 98% (almost white)
- All colors adjusted for contrast

---

## ✨ Special Effects

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradient Background

```css
.gradient-sage {
  background: linear-gradient(
    to bottom right,
    rgba(123, 174, 127, 0.2),
    transparent
  );
}
```

### Text Gradient

```css
.text-gradient {
  background: linear-gradient(
    to right,
    #7BAE7F,
    #FFB86B
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 📊 Page Layouts

### Dashboard

**Header**: Welcome message + Date/Add buttons
**Content**:
- Left: Calorie progress + Macros + Weekly chart
- Right: Stats cards + Quick actions
- Bottom: AI recommendations + Motivation

### Recipes

**Header**: Title + Search
**Filters**: Horizontal chip buttons
**Grid**: Masonry/responsive grid
**Card**: Image + Title + Nutrition + Rating

### Tracking

**Header**: Title
**Stats**: 3 stat cards
**Left**: Weight trend chart
**Right**: Macro pie chart
**Bottom**: Insights

---

## 🎯 UX Best Practices

1. **Feedback**: Every action has visual feedback (hover, active, disabled)
2. **Loading**: Skeleton screens or animated spinners
3. **Empty States**: Friendly messages with illustrations
4. **Micro-interactions**: Subtle transitions between states
5. **Accessibility**: Focus rings, proper contrast, keyboard nav
6. **Consistency**: Same component, same behavior everywhere

---

## 🔄 Component Usage Examples

### Button
```jsx
<Button size="lg" variant="default">Get Started</Button>
<Button size="sm" variant="outline">Cancel</Button>
```

### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### ProgressRing
```jsx
<ProgressRing percentage={75} size={120} color="sage" />
```

### NutritionCard
```jsx
<NutritionCard
  name="Salmon Salad"
  calories={420}
  protein={42}
  carbs={15}
  fat={18}
  rating={4.9}
  time="25 min"
/>
```

---

## 🚀 Performance Tips

1. Use `motion.div` instead of creating multiple divs
2. Memoize expensive components with `React.memo`
3. Lazy load heavy components with `React.lazy`
4. Use `layoutId` for shared layout animations
5. Optimize images and icons
6. Debounce search/filter inputs

---

## 🎨 Design Tokens Reference

All design tokens are defined in `index.css` using CSS custom properties:

```css
--sage: #7BAE7F
--cream: #F8F6F1
--soft-orange: #FFB86B
--charcoal: #2D2D2D
```

Access via Tailwind utilities:
```jsx
className="bg-sage text-cream"
```

---

## 🔗 Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Recharts Docs**: https://recharts.org/
- **Lucide Icons**: https://lucide.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Color Theory**: https://coolors.co/

---

## 📝 Version History

- v1.0: Initial design system implementation
- Pages: 10 fully designed pages
- Components: 15+ reusable components
- Animations: 20+ animation patterns
- Responsive: Mobile → Tablet → Desktop

---

**Last Updated**: May 18, 2026
**Status**: Complete ✓
