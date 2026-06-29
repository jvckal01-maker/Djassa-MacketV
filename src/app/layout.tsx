import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
    title: 'Djasse Market — Le marché de toute l\'Afrique de l\'Ouest',
    description:
        'Djasse Market — Achetez et vendez en Côte d\'Ivoire et en Afrique de l\'Ouest. Livraison rapide, paiement Mobile Money, Franc CFA.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
                <Toaster position="top-right" />
            </body>
        </html>
    );
}

