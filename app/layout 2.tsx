import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EncryptData.net | Your Data. Secured Globally. Preventing AI-Powered Threats. Quantum-Proof.',
  description: 'Preventing AI-powered threats with, quantum-proof secured databases in data centers worldwide. Built for hospitals, hotels, airlines, manufacturing, and every B2B/B2C business. 24×7×365 global SLAs.',
  keywords: ['AI security', 'quantum-proof encryption', 'post-quantum cryptography', 'secure data storage', 'blockchain', 'zero-knowledge proofs', 'data center', 'HIPAA', 'PCI DSS', 'GDPR', 'enterprise security'],
  authors: [{ name: 'EncryptData.net (EDN)' }],
  openGraph: {
    title: 'EncryptData.net | Your Data. Secured Globally. Preventing AI-Powered Threats. Quantum-Proof.',
    description: 'Preventing AI-powered threats with, quantum-proof secured databases in data centers worldwide.',
    type: 'website',
    url: 'https://encryptdata.net',
    siteName: 'EncryptData.net',
    images: [{ url: 'https://encryptdata.net/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EncryptData.net | Your Data. Secured Globally. Preventing AI-Powered Threats. Quantum-Proof.',
    description: 'Preventing AI-powered threats with, quantum-proof secured databases in data centers worldwide.',
    images: ['https://encryptdata.net/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://encryptdata.net' },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1020',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EncryptData.net',
  alternateName: 'EDN',
  url: 'https://encryptdata.net',
  logo: 'https://encryptdata.net/logo.png',
  description: 'Preventing AI-powered threats with, quantum-proof secured databases in data centers worldwide.',
  foundingDate: '2024',
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Cary', addressRegion: 'NC', addressCountry: 'US' },
    { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    availableLanguage: ['English'],
    areaServed: 'Worldwide',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <div className="bg-grid" />
        <div className="bg-orbs" />
        {children}
      </body>
    </html>
  );
}
