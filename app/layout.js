import './globals.css'

export const metadata = {
  title: 'Gamio',
  description: 'A modern gaming platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  )
}
