import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
        include: { shop: true }
    });

    if (!product || product.status !== 'PUBLISHED') {
        notFound();
    }

    return (
        <section className="mx-auto max-w-3xl px-4 py-16">
            <Link href={`/boutique/${product.shop.slug}`} className="text-sm text-brand-700 hover:underline">
                &larr; {product.shop.name}
            </Link>

            <h1 className="mt-4 text-2xl font-black text-gray-900">{product.name}</h1>
            {product.description && <p className="mt-2 text-gray-600">{product.description}</p>}

            <p className="mt-6 text-xl font-bold text-gray-900">
                {product.priceCfa.toLocaleString('fr-FR')} FCFA
            </p>
            <p className="mt-1 text-sm text-gray-600">
                {product.stock > 0 ? 'En stock' : 'Épuisé'}
            </p>
        </section>
    );
}
