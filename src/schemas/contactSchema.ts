import {z} from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone must be at least 10 characters'),
    description: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;