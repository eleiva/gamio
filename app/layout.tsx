import './globals.css'
import { ReactNode } from 'react';

export const metadata = {
  title: 'Gamio',
  description: 'A modern gaming platform',
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
      </head>
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  )
}
