export function slugify(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(
    name: string,
    slugExists: (slug: string) => Promise<boolean>
): Promise<string> {
    const base = slugify(name) || 'item';
    let slug = base;
    let suffix = 2;

    while (await slugExists(slug)) {
        slug = `${base}-${suffix}`;
        suffix += 1;
    }

    return slug;
}
