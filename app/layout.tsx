import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnovateCorp - Transform Your Business with Next-Level Solutions',
  description: 'Professional business solutions including digital strategy, consulting services, and technology implementations. Transform your business with InnovateCorp.',
  keywords: 'business consulting, digital transformation, technology solutions, strategic planning',
  authors: [{ name: 'InnovateCorp' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}