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
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  )
}
