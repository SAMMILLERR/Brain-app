# Brain App Design System

A modern, empathetic design system for the Brain App - a social platform where people share thoughts, micro-ideas, interests, and discoveries with neural-inspired visual language.

## 🎨 Design Philosophy

**Tone**: Empathetic, playful, calm - encourages sharing and curiosity  
**Visual Language**: Soft rounded shapes, neural/brain motifs (subtle), pastel gradients, glassy cards, lively microinteractions  
**Accessibility**: WCAG AA compliant with proper contrast ratios and keyboard navigation

## 🚀 Quick Start

### 1. Import the Theme

```tsx
// In your main CSS file (index.css)
@import './theme.css';
```

### 2. Use Tailwind Classes

The design system extends Tailwind CSS with custom tokens and utilities:

```tsx
// Glass card with neural background
<div className="card-glass neural-bg">
  <h3 className="text-text-primary">Your content</h3>
</div>

// Primary button with hover effects
<button className="btn btn-primary hover-lift">
  Share Your Spark
</button>
```

### 3. Add Dark Mode Support

```tsx
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="dark:bg-gray-900">
      <ThemeToggle />
      {/* Your app content */}
    </div>
  );
}
```

## 🎯 Core Components

### Buttons

```tsx
// Primary action buttons
<button className="btn btn-primary">Share Your Spark</button>
<button className="btn btn-primary btn-lg">Large Primary</button>

// Secondary buttons
<button className="btn btn-secondary">Explore Minds</button>

// Ghost buttons for subtle actions
<button className="btn btn-ghost">
  <HeartIcon className="w-4 h-4" />
  Like
</button>
```

### Cards

```tsx
// Glass morphism cards
<div className="card-glass p-6">
  <h3>Neural Thought</h3>
  <p>Content with subtle transparency and blur</p>
</div>

// Solid surface cards
<div className="card-surface p-6 hover-lift">
  <h3>Brain Drop</h3>
  <p>Clear background with hover animations</p>
</div>
```

### Form Elements

```tsx
// Styled inputs with focus states
<input 
  type="text" 
  placeholder="What's brewing in your mind?"
  className="input focus-ring"
/>

// Textareas for longer content
<textarea 
  placeholder="Share your thoughts..."
  className="input textarea focus-ring"
/>
```

### Interest Chips/Tags

```tsx
// Interactive tag chips
<span className="chip">#AI</span>
<span className="chip chip-active">#Poetry</span>
<button className="chip hover-scale">#LifeHacks</button>
```

### Avatars

```tsx
// User avatars with size variants
<div className="avatar avatar-sm">JS</div>
<div className="avatar avatar-md avatar-online">AD</div>
<div className="avatar avatar-lg">MK</div>
```

## 🎨 Design Tokens

### Colors

```css
/* Primary neural colors */
--primary: #8b74a5;
--primary-gradient: linear-gradient(135deg, #8b74a5 0%, #c299d1 50%, #f4a49c 100%);

/* Accent warm coral */
--accent: #f4a49c;
--accent-gradient: linear-gradient(135deg, #f4a49c 0%, #ffb4a3 100%);

/* Status colors */
--success: #6bbf59;
--danger: #e85d75;
--warning: #f0b849;

/* Text hierarchy */
--text-primary: #2d2a33;
--text-secondary: #5a5560;
--text-muted: #8a8591;
```

### Spacing Scale

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
```

### Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--fs-xs: 0.75rem;    /* 12px */
--fs-sm: 0.875rem;   /* 14px */
--fs-base: 1rem;     /* 16px */
--fs-lg: 1.125rem;   /* 18px */
--fs-xl: 1.25rem;    /* 20px */
```

## ✨ Utility Classes

### Glass Morphism

```css
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-glass {
  /* Pre-built glass card with hover effects */
}
```

### Animations

```css
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

### Neural Background

```css
.neural-bg {
  background-image: radial-gradient(circle at 20% 50%, rgba(139, 116, 165, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(244, 164, 156, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(194, 153, 209, 0.03) 0%, transparent 50%);
}
```

## 🌙 Dark Mode

The theme automatically supports dark mode with the `.dark` class:

```tsx
// Toggle dark mode
const toggleDark = () => {
  document.documentElement.classList.toggle('dark');
};

// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

Dark mode tokens:
```css
.dark {
  --bg: #1a1720;
  --surface: rgba(42, 37, 50, 0.8);
  --text-primary: #f0eef2;
  --glass: rgba(42, 37, 50, 0.4);
}
```

## 🎯 Microcopy & Voice

### CTA Examples
- "Share what's sparking"
- "Drop your mind bubble"
- "Hop on the brainwave"
- "Pop your curiosity"
- "Light up the network"

### Placeholder Text
- "What's brewing in your mind?"
- "Share your spark with the world..."
- "A thought, link, or wild idea?"
- "What caught your curiosity today?"
- "Drop something that made you think..."

### Content Types
- 💭 Thoughts
- 🎥 Videos
- 📰 Articles
- 🎨 Sketches
- 🎵 Music Snippets
- 🧠 Philosophy
- 💡 Life Hacks

## 📱 Responsive Design

The system includes responsive utilities:

```tsx
// Grid that adapts to screen size
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Square cards on all screens */}
  <div className="card-glass aspect-square">Content</div>
</div>

// Hide/show elements by screen size
<div className="hidden-mobile">Desktop only</div>
<div className="hidden-desktop">Mobile only</div>
```

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements support keyboard navigation
- **Focus Indicators**: Clear focus rings with sufficient contrast
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

```tsx
// Accessible button example
<button 
  className="btn btn-primary focus-ring"
  aria-label="Share your thought with the brain network"
>
  <ShareIcon aria-hidden="true" />
  Share
</button>
```

## 🔧 Customization

### Override CSS Variables

```css
:root {
  /* Customize primary color */
  --primary: #your-color;
  --primary-gradient: linear-gradient(135deg, #your-color 0%, #your-color-light 100%);
  
  /* Adjust spacing */
  --space-4: 1.25rem; /* Increase base spacing */
  
  /* Custom fonts */
  --font-sans: 'Your Font', 'Inter', sans-serif;
}
```

### Extend Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#your-primary',
          secondary: '#your-secondary',
        }
      }
    }
  }
}
```

## 🚀 Performance

- **Minimal CSS**: ~15KB gzipped
- **Tree Shaking**: Only includes used Tailwind utilities
- **Optimized Animations**: Hardware-accelerated transforms
- **Lazy Loading**: Images use `loading="lazy"` by default

## 📦 Installation

1. **Install Dependencies**:
```bash
npm install tailwindcss @tailwindcss/typography
```

2. **Copy Theme Files**:
- `theme.css` - Core design tokens
- `tailwind.config.js` - Extended Tailwind configuration

3. **Import in Your App**:
```tsx
import './theme.css';
```

## 🤝 Contributing

1. Follow the design principles: empathetic, playful, calm
2. Maintain accessibility standards
3. Test in both light and dark modes
4. Use semantic class names
5. Document new components

## 📚 Resources

- **Icons**: [Heroicons](https://heroicons.com/) for consistent SVG icons
- **Fonts**: [Inter](https://rsms.me/inter/) for primary typography
- **Inspiration**: Neural networks, brain connectivity, organic shapes
- **Color Tools**: [Coolors.co](https://coolors.co/) for palette generation

## 📄 License

MIT License - Feel free to use in your projects!
