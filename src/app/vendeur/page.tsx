import Link from 'next/link';
import type { Product } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { CreateShopForm } from '@/components/seller/CreateShopForm';
import { AddProductForm } from '@/components/seller/AddProductForm';
import { ProductRow } from '@/components/seller/ProductRow';

export default async function VendeurPage() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <section className="mx-auto max-w-md px-4 py-16 text-center">
                <h1 className="text-2xl font-black text-gray-900">Espace vendeur</h1>
                <p className="mt-2 text-gray-600">
                    <Link href="/login" className="font-medium text-brand-600">
                        Connectez-vous
                    </Link>{' '}
                    pour accéder à votre boutique.
                </p>
            </section>
        );
    }

    const shop = await prisma.shop.findUnique({
        where: { ownerId: user.id },
        include: { products: { orderBy: { createdAt: 'desc' } } }
    });

    if (!shop) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-16">
                <h1 className="text-2xl font-black text-gray-900">Créer ma boutique</h1>
                <p className="mt-2 text-gray-600">Vous n&apos;avez pas encore de boutique.</p>
                <CreateShopForm />
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">{shop.name}</h1>
            {shop.description && <p className="mt-2 text-gray-600">{shop.description}</p>}

            <h2 className="mt-10 text-lg font-bold text-gray-900">Mes produits</h2>
            {shop.products.length === 0 ? (
                <p className="mt-2 text-gray-600">Aucun produit pour le moment.</p>
            ) : (
                <table className="mt-4 w-full">
                    <thead>
                        <tr className="border-b text-left text-xs uppercase text-gray-500">
                            <th className="py-2 pr-4">Nom</th>
                            <th className="py-2 pr-4">Prix</th>
                            <th className="py-2 pr-4">Stock</th>
                            <th className="py-2 pr-4">Statut</th>
                            <th className="py-2 pr-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shop.products.map((product: Product) => (
                            <ProductRow key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            )}

            <h2 className="mt-10 text-lg font-bold text-gray-900">Ajouter un produit</h2>
            <AddProductForm />
        </section>
    );
}
