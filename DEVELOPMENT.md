# Gamio - Development Guide

## Project Overview

Gamio is a modern gaming collection management application built with Next.js, TypeScript, and Tailwind CSS. It allows users to manage their game library with features like search, categorization, and game management.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Code Quality**: ESLint + Prettier

## Project Structure

```
gamio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and imports
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── forms/            # Form components
│   │   └── SearchBar.tsx
│   ├── games/            # Game-related components
│   │   ├── GameCard.tsx
│   │   └── GamesSection.tsx
│   ├── layout/           # Layout components
│   │   └── Header.tsx
│   └── ui/               # Reusable UI components
│       ├── button.jsx
│       ├── card.jsx
│       └── input.jsx
├── hooks/                # Custom React hooks
│   └── useGames.ts
├── styles/               # CSS organization
│   ├── variables.css     # CSS custom properties
│   ├── base.css         # Base styles and reset
│   ├── components.css   # Component-specific styles
│   └── utilities.css    # Utility classes
├── types/               # TypeScript type definitions
│   └── index.ts
├── lib/                 # Utility functions
│   └── utils.js
└── public/              # Static assets
```

## CSS Architecture

### Organization Strategy

The CSS is organized into four main files:

1. **`variables.css`** - Design tokens and CSS custom properties
2. **`base.css`** - Base styles, reset, and global styles
3. **`components.css`** - Component-specific styles
4. **`utilities.css`** - Utility classes for common patterns

### Naming Conventions

- **BEM Methodology**: Block__Element--Modifier
- **Component Classes**: `.component-name`
- **Element Classes**: `.component-name__element`
- **Modifier Classes**: `.component-name--modifier`
- **Utility Classes**: `.utility-name`

### CSS Custom Properties

All design tokens are defined as CSS custom properties in `variables.css`:

```css
:root {
  --color-primary: 221.2 83.2% 53.3%;
  --spacing-md: 0.75rem;
  --font-size-lg: 1.125rem;
  --radius-lg: 0.75rem;
}
```

## Component Guidelines

### Component Structure

Each component should follow this structure:

```tsx
import React from 'react';
import { ComponentProps } from '@/types';

const ComponentName: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2, 
  className = "" 
}) => {
  return (
    <div className={`component-class ${className}`}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Props Interface

All component props should be defined in `types/index.ts`:

```tsx
export interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
  className?: string;
}
```

### Styling Guidelines

1. **Use CSS classes over inline styles**
2. **Follow BEM naming convention**
3. **Use CSS custom properties for consistent theming**
4. **Mobile-first responsive design**
5. **Accessibility-first approach**

## State Management

### Custom Hooks

State management is handled through custom hooks:

- **`useGames`**: Manages game data, search, and CRUD operations
- Future hooks: `useTheme`, `useLocalStorage`, `useAPI`

### Hook Structure

```tsx
export const useCustomHook = () => {
  const [state, setState] = useState(initialValue);
  
  const action = useCallback((param) => {
    // Action logic
  }, [dependencies]);
  
  return {
    state,
    action,
    // Other values
  };
};
```

## Development Workflow

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Run linting**:
   ```bash
   npm run lint
   ```

4. **Format code**:
   ```bash
   npx prettier --write .
   ```

### Code Quality

- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Git Hooks**: Pre-commit hooks for code quality

### Git Workflow

1. **Feature branches**: `feature/feature-name`
2. **Bug fixes**: `bugfix/issue-description`
3. **Hotfixes**: `hotfix/critical-issue`
4. **Commits**: Use conventional commit messages

## Performance Guidelines

### React Performance

- Use `React.memo` for expensive components
- Implement `useCallback` and `useMemo` for expensive operations
- Lazy load components when appropriate
- Optimize images with Next.js Image component

### CSS Performance

- Use CSS custom properties for theming
- Minimize CSS specificity
- Use utility classes for common patterns
- Implement critical CSS loading

### Bundle Optimization

- Use dynamic imports for code splitting
- Optimize bundle size with webpack analyzer
- Implement proper caching strategies

## Accessibility Guidelines

### WCAG 2.1 Compliance

- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Provide descriptive labels
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain proper contrast ratios
- **Focus Management**: Visible focus indicators

### Implementation

```tsx
// Good accessibility example
<button
  className="game-card__delete-button"
  onClick={handleDelete}
  aria-label={`Delete ${game.title}`}
  type="button"
>
  <Trash2 className="game-card__delete-icon" />
</button>
```

## Testing Strategy

### Unit Testing

- Test individual components in isolation
- Mock external dependencies
- Test user interactions and state changes

### Integration Testing

- Test component interactions
- Test API integrations
- Test routing and navigation

### E2E Testing

- Test complete user workflows
- Test cross-browser compatibility
- Test responsive design

## Deployment

### Environment Setup

1. **Development**: Local development with hot reload
2. **Staging**: Preview deployments for testing
3. **Production**: Optimized build for production

### Build Process

```bash
# Development build
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Future Enhancements

### Planned Features

1. **User Authentication**: Login/signup functionality
2. **Data Persistence**: Local storage and cloud sync
3. **Game Details**: Detailed game information and metadata
4. **Categories**: Game categorization and filtering
5. **Statistics**: Gaming statistics and analytics
6. **Dark Mode**: Theme switching capability
7. **PWA Support**: Progressive Web App features

### Technical Improvements

1. **State Management**: Redux Toolkit or Zustand
2. **API Integration**: Backend API for data persistence
3. **Testing**: Comprehensive test suite
4. **Performance**: Advanced optimization techniques
5. **Monitoring**: Error tracking and analytics

## Contributing

### Code Standards

- Follow the established patterns and conventions
- Write meaningful commit messages
- Update documentation for new features
- Add tests for new functionality
- Ensure accessibility compliance

### Pull Request Process

1. Create a feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request with description
5. Address review feedback
6. Merge after approval

## Troubleshooting

### Common Issues

1. **CSS not loading**: Check import paths in globals.css
2. **TypeScript errors**: Ensure proper type definitions
3. **Build failures**: Check for syntax errors and missing dependencies
4. **Performance issues**: Use React DevTools Profiler

### Debug Tools

- **React DevTools**: Component inspection
- **Next.js DevTools**: Performance monitoring
- **Browser DevTools**: Network and performance analysis
- **ESLint/Prettier**: Code quality tools

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
