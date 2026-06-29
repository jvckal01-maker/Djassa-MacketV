'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function CreateShopForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const res = await fetch('/api/shops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                description: formData.get('description') || undefined
            })
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            toast.error(data.error ?? 'Création impossible');
            return;
        }

        toast.success('Boutique créée');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom de la boutique
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
            <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {loading ? 'Création...' : 'Créer ma boutique'}
            </button>
        </form>
    );
}
