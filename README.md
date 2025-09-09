# Gamio 🚀

A modern Next.js application ready for Vercel deployment.

## Project Structure

```
gamio/
├── app/                    # Next.js App Router directory
│   ├── globals.css        # Global styles with Tailwind CSS
│   ├── layout.js          # Root layout component
│   └── page.js            # Home page component
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vercel.json           # Vercel deployment configuration
└── .gitignore            # Git ignore rules
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Vercel Deployment

This project is configured for seamless Vercel deployment:

### Option 1: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Option 2: Deploy via Vercel Dashboard
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Configuration Files
- `vercel.json` - Vercel deployment configuration
- `next.config.js` - Next.js configuration optimized for Vercel

## Features
- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS for styling
- ✅ ESLint for code quality
- ✅ Vercel-optimized build
- ✅ Responsive design
- ✅ Modern React patterns

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **Deployment**: Vercel
- **Package Manager**: npm
