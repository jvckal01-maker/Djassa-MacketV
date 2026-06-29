import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function BoutiquePage() {
    const shops = await prisma.shop.findMany({
        where: { products: { some: { status: 'PUBLISHED' } } },
        include: { _count: { select: { products: { where: { status: 'PUBLISHED' } } } } },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">Boutiques</h1>

            {shops.length === 0 ? (
                <p className="mt-2 text-gray-600">Aucune boutique pour le moment.</p>
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {shops.map((shop) => (
                        <Link
                            key={shop.id}
                            href={`/boutique/${shop.slug}`}
                            className="rounded-lg border p-4 hover:border-brand-600"
                        >
                            <h2 className="font-bold text-gray-900">{shop.name}</h2>
                            {shop.description && (
                                <p className="mt-1 text-sm text-gray-600">{shop.description}</p>
                            )}
                            <p className="mt-2 text-xs text-gray-500">
                                {shop._count.products} produit{shop._count.products > 1 ? 's' : ''}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
