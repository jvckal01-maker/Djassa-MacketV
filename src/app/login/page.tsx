import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <section className="mx-auto max-w-md px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">Connexion</h1>
            <LoginForm />
        </section>
    );
}
