import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function RecherchePage({
    searchParams
}: {
    searchParams: { q?: string };
}) {
    const q = typeof searchParams.q === 'string' ? searchParams.q.trim() : '';

    const products = await prisma.product.findMany({
        where: {
            status: 'PUBLISHED',
            ...(q ? { name: { contains: q, mode: 'insensitive' } } : {})
        },
        include: { shop: { select: { name: true, slug: true } } },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">Recherche</h1>

            <form action="/recherche" method="GET" className="mt-4 flex max-w-xl gap-2">
                <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Cherche ton truc ici..."
                    className="flex-1 rounded-full border px-4 py-2 text-sm"
                />
                <button
                    type="submit"
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Chercher
                </button>
            </form>

            {products.length === 0 ? (
                <p className="mt-6 text-gray-600">Aucun produit trouvé.</p>
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/produit/${product.slug}`}
                            className="rounded-lg border p-4 hover:border-brand-600"
                        >
                            <h2 className="font-bold text-gray-900">{product.name}</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {product.priceCfa.toLocaleString('fr-FR')} FCFA
                            </p>
                            <p className="mt-1 text-xs text-gray-500">{product.shop.name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
