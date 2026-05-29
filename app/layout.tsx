import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'MarketPlace — Buy & Sell Anything',
  description: 'Buy and sell unwanted stuff near you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  )
}