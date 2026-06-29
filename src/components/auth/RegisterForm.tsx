'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            toast.error(data.error ?? 'Inscription impossible');
            return;
        }

        toast.success('Compte créé avec succès');
        router.push('/');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {loading ? 'Création...' : 'Créer mon compte'}
            </button>
            <p className="text-center text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link href="/login" className="font-medium text-brand-600">
                    Se connecter
                </Link>
            </p>
        </form>
    );
}
