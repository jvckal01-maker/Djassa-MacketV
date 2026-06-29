import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Product } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export default async function ShopDetailPage({ params }: { params: { slug: string } }) {
    const shop = await prisma.shop.findUnique({
        where: { slug: params.slug },
        include: { products: { where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } } }
    });

    if (!shop) {
        notFound();
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">{shop.name}</h1>
            {shop.description && <p className="mt-2 text-gray-600">{shop.description}</p>}

            <h2 className="mt-10 text-lg font-bold text-gray-900">Produits</h2>
            {shop.products.length === 0 ? (
                <p className="mt-2 text-gray-600">Aucun produit publié pour le moment.</p>
            ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {shop.products.map((product: Product) => (
                        <Link
                            key={product.id}
                            href={`/produit/${product.slug}`}
                            className="rounded-lg border p-4 hover:border-brand-600"
                        >
                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {product.priceCfa.toLocaleString('fr-FR')} FCFA
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
