import './globals.css'
import '../styles/logo.css'
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Gamio - Discover and Collect Your Favorite Games',
    template: '%s | Gamio'
  },
  description: 'Discover, collect, and manage your favorite video games with Gamio. Browse through thousands of games, read reviews, and build your personal gaming collection.',
  keywords: ['gaming', 'video games', 'game collection', 'gaming platform', 'game discovery', 'IGDB', 'game reviews'],
  authors: [{ name: 'Gamio Team' }],
  creator: 'Gamio',
  publisher: 'Gamio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamio.app',
    title: 'Gamio - Discover and Collect Your Favorite Games',
    description: 'Discover, collect, and manage your favorite video games with Gamio. Browse through thousands of games, read reviews, and build your personal gaming collection.',
    siteName: 'Gamio',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Gamio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamio - Discover and Collect Your Favorite Games',
    description: 'Discover, collect, and manage your favorite video games with Gamio.',
    images: ['/favicon.ico'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://gamio.app" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="pink-gradient-bg text-black">
        <div id="root" role="main">
          {children}
        </div>
      </body>
    </html>
  )
}
