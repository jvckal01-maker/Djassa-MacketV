import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Adresse e-mail invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export const loginSchema = z.object({
    email: z.string().email('Adresse e-mail invalide'),
    password: z.string().min(1, 'Mot de passe requis')
});

export const shopSchema = z.object({
    name: z.string().min(2, 'Le nom de la boutique doit contenir au moins 2 caractères'),
    description: z.string().max(2000).optional()
});

export const productSchema = z.object({
    name: z.string().min(2, 'Le nom du produit doit contenir au moins 2 caractères'),
    description: z.string().max(2000).optional(),
    priceCfa: z.number().int().positive('Le prix doit être un nombre positif'),
    stock: z.number().int().min(0).default(0)
});

export const productUpdateSchema = z.object({
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    stock: z.number().int().min(0).optional(),
    priceCfa: z.number().int().positive().optional()
});
