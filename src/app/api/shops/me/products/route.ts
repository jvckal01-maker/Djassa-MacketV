import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { productSchema } from '@/lib/validation';
import { generateUniqueSlug } from '@/lib/slugify';

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour ajouter un produit' }, { status: 401 });
    }

    const shop = await prisma.shop.findUnique({ where: { ownerId: user.id } });
    if (!shop) {
        return NextResponse.json({ error: 'Créez votre boutique avant d\'ajouter un produit' }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { name, description, priceCfa, stock } = parsed.data;
    const slug = await generateUniqueSlug(name, async (slug) => {
        const match = await prisma.product.findUnique({ where: { slug } });
        return match !== null;
    });

    const product = await prisma.product.create({
        data: { name, description, priceCfa, stock, slug, shopId: shop.id }
    });

    return NextResponse.json({ product }, { status: 201 });
}
