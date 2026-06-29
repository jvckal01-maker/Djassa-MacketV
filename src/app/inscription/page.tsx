import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <section className="mx-auto max-w-md px-4 py-16">
            <h1 className="text-2xl font-black text-gray-900">Créer un compte</h1>
            <RegisterForm />
        </section>
    );
}
