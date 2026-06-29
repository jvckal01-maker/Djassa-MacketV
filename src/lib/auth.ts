import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const SESSION_COOKIE = 'djasse_session';
const SESSION_DURATION = '7d';

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set');
    }
    return secret;
}

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

export function signSession(userId: string): string {
    return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: SESSION_DURATION });
}

export function verifySession(token: string): { sub: string } | null {
    try {
        return jwt.verify(token, getJwtSecret()) as { sub: string };
    } catch {
        return null;
    }
}

export async function getCurrentUser() {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const payload = verifySession(token);
    if (!payload) return null;

    return prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
}
