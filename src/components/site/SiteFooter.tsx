export function SiteFooter() {
    return (
        <footer className="mt-12 border-t bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} Djasse Market. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
