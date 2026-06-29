'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function AddProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const res = await fetch('/api/shops/me/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                description: formData.get('description') || undefined,
                priceCfa: Number(formData.get('priceCfa')),
                stock: Number(formData.get('stock') || 0)
            })
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            toast.error(data.error ?? 'Ajout impossible');
            return;
        }

        toast.success('Produit ajouté');
        event.currentTarget.reset();
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom du produit
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description (optionnel)
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="priceCfa" className="block text-sm font-medium text-gray-700">
                        Prix (FCFA)
                    </label>
                    <input
                        id="priceCfa"
                        name="priceCfa"
                        type="number"
                        min={1}
                        required
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {loading ? 'Ajout...' : 'Ajouter le produit'}
            </button>
        </form>
    );
}
