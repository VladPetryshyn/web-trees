import './globals.css'
import { Inter } from 'next/font/google'
import { HeaderMenu } from '@/components/header/Menu'
import { Logo } from '@/components/icons/logo'
import { getUser } from '@/server/handlers/helpers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = getUser();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-light-bg flex flex-col`}>
        <header
          className="bg-light-bg2 w-full flex flex-col rounded-r-2xl rounded-l-2xl sticky top-0 align-center p-7 flex-1">
          <div className={`flex justify-center f-full ${user ? "" : "pr-9"}`}>
            <Logo />
          </div>
          <HeaderMenu user={user} />
        </header>
        <main className="px-16 py-4 flex-1 min-h-screen">
          {children}
        </main>
        <footer className="bg-light-bg2 py-7 rounded-tr-2xl rounded-tl-2xl">
          <p className="text-light-fg text-center">Vlad Petryshyn 2023 ©</p>
        </footer>
      </body>
    </html>
  )
}
