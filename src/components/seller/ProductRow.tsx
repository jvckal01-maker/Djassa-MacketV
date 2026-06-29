'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { Product } from '@prisma/client';

const STATUS_LABEL: Record<Product['status'], string> = {
    DRAFT: 'Brouillon',
    PUBLISHED: 'Publié',
    ARCHIVED: 'Archivé'
};

export function ProductRow({ product }: { product: Product }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function togglePublish() {
        setLoading(true);
        const nextStatus = product.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        const res = await fetch(`/api/products/${product.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus })
        });
        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            toast.error(data.error ?? 'Mise à jour impossible');
            return;
        }

        router.refresh();
    }

    async function handleDelete() {
        setLoading(true);
        const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
        setLoading(false);

        if (!res.ok) {
            const data = await res.json();
            toast.error(data.error ?? 'Suppression impossible');
            return;
        }

        toast.success('Produit supprimé');
        router.refresh();
    }

    return (
        <tr className="border-b text-sm">
            <td className="py-2 pr-4">{product.name}</td>
            <td className="py-2 pr-4">{product.priceCfa.toLocaleString('fr-FR')} FCFA</td>
            <td className="py-2 pr-4">{product.stock}</td>
            <td className="py-2 pr-4">{STATUS_LABEL[product.status]}</td>
            <td className="py-2 pr-4 text-right">
                <button
                    onClick={togglePublish}
                    disabled={loading}
                    className="mr-3 text-brand-700 hover:underline disabled:opacity-50"
                >
                    {product.status === 'PUBLISHED' ? 'Dépublier' : 'Publier'}
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="text-red-600 hover:underline disabled:opacity-50"
                >
                    Supprimer
                </button>
            </td>
        </tr>
    );
}
