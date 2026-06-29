import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { shopSchema } from '@/lib/validation';
import { generateUniqueSlug } from '@/lib/slugify';

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour créer une boutique' }, { status: 401 });
    }

    const existing = await prisma.shop.findUnique({ where: { ownerId: user.id } });
    if (existing) {
        return NextResponse.json({ error: 'Vous avez déjà une boutique' }, { status: 409 });
    }

    const body = await request.json().catch(() => null);
    const parsed = shopSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { name, description } = parsed.data;
    const slug = await generateUniqueSlug(name, async (slug) => {
        const match = await prisma.shop.findUnique({ where: { slug } });
        return match !== null;
    });

    const shop = await prisma.$transaction(async (tx) => {
        const created = await tx.shop.create({
            data: { name, description, slug, ownerId: user.id }
        });
        if (user.role === 'BUYER') {
            await tx.user.update({ where: { id: user.id }, data: { role: 'SELLER' } });
        }
        return created;
    });

    return NextResponse.json({ shop }, { status: 201 });
}
