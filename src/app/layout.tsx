import { ReduxProvider } from '@/app/provider'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'testTaskForNewsMediaHolding',
	description: 'Тестовое задание для компании NewsMediaHolding',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${geistSans.variable}`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	)
}
