# Gamio 🎮

A modern, responsive gaming collection management application built with Next.js, TypeScript, and Tailwind CSS.

![Gamio Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Gamio+Gaming+Collection+Manager)

## ✨ Features

- **Game Collection Management**: Add, view, and manage your gaming library
- **Smart Search**: Find games quickly with real-time search functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **TypeScript Support**: Full type safety and better developer experience
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation support
- **Performance Optimized**: Fast loading with Next.js optimization features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gamio.git
   cd gamio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
gamio/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── forms/            # Form components
│   ├── games/            # Game-related components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── styles/               # CSS organization
│   ├── variables.css     # Design tokens
│   ├── base.css         # Base styles
│   ├── components.css   # Component styles
│   └── utilities.css    # Utility classes
├── types/               # TypeScript definitions
└── lib/                 # Utility functions
```

## 🎨 Design System

### CSS Architecture

The project uses a well-organized CSS structure:

- **Design Tokens**: Centralized in `styles/variables.css`
- **Component Styles**: BEM methodology with semantic naming
- **Utility Classes**: Reusable utility classes for common patterns
- **Responsive Design**: Mobile-first approach with breakpoints

### Color Palette

- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#6b7280)
- **Background**: White (#ffffff)
- **Text**: Dark gray (#1f2937)

### Typography

- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Scale**: Consistent typography scale from 12px to 60px
- **Weights**: 400 (normal) to 800 (extrabold)

## 🔧 Configuration

### TypeScript

The project is fully configured with TypeScript:

- Strict type checking enabled
- Path mapping for clean imports
- Comprehensive type definitions
- ESLint integration

### ESLint & Prettier

Code quality is maintained with:

- ESLint with TypeScript and React rules
- Prettier for consistent formatting
- Pre-commit hooks for quality assurance

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 480px (2 columns)
- **Tablet**: 480px - 768px (3 columns)
- **Desktop**: 768px - 1024px (4 columns)
- **Large Desktop**: > 1024px (5 columns)

## ♿ Accessibility

Built with accessibility in mind:

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast mode support
- Screen reader compatibility

## 🚀 Performance

Optimized for performance:

- Next.js automatic optimizations
- Image optimization with lazy loading
- CSS custom properties for theming
- Minimal bundle size
- Fast loading times

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing
- **Accessibility Tests**: WCAG compliance testing

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Static site deployment
- **AWS**: Serverless deployment with Lambda
- **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

- **Documentation**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/gamio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gamio/discussions)

---

Made with ❤️ by the Gamio team