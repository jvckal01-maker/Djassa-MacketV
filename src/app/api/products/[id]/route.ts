import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { productUpdateSchema } from '@/lib/validation';

async function loadOwnedProduct(productId: string, userId: string) {
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { shop: true }
    });

    if (!product || product.shop.ownerId !== userId) {
        return null;
    }

    return product;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour modifier ce produit' }, { status: 401 });
    }

    const product = await loadOwnedProduct(params.id, user.id);
    if (!product) {
        return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const updated = await prisma.product.update({
        where: { id: product.id },
        data: parsed.data
    });

    return NextResponse.json({ product: updated });
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Connectez-vous pour supprimer ce produit' }, { status: 401 });
    }

    const product = await loadOwnedProduct(params.id, user.id);
    if (!product) {
        return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: product.id } });

    return NextResponse.json({ ok: true });
}
