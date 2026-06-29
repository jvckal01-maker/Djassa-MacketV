import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { shopSchema } from '@/lib/validation';

export async function GET() {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour accéder à votre boutique' }, { status: 401 });
    }

    const shop = await prisma.shop.findUnique({
        where: { ownerId: user.id },
        include: { products: { orderBy: { createdAt: 'desc' } } }
    });

    return NextResponse.json({ shop });
}

export async function PATCH(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour accéder à votre boutique' }, { status: 401 });
    }

    const existing = await prisma.shop.findUnique({ where: { ownerId: user.id } });
    if (!existing) {
        return NextResponse.json({ error: 'Aucune boutique trouvée' }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const parsed = shopSchema.partial().safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const shop = await prisma.shop.update({
        where: { ownerId: user.id },
        data: parsed.data
    });

    return NextResponse.json({ shop });
}
