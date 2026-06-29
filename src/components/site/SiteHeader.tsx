import Link from 'next/link';
import { Search } from 'lucide-react';

const brand = {
  name: 'Djasse 🛒 Market',
  tagline: 'Le marché de toute l\'Afrique de l\'Ouest'
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-black">
          <span className="text-lg">{brand.name}</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <Link
            href="/recherche"
            className="flex w-full max-w-xl items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600"
          >
            <Search size={16} />
            <span>Cherche ton truc ici...</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/boutique" className="text-sm text-gray-700 hover:text-brand-600">
            Boutiques
          </Link>
          <Link href="/login" className="rounded-full bg-gray-900 px-4 py-2 text-sm text-white">
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
}

