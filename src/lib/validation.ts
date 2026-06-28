import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name too long').trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(200, 'Email too long')
    .email('Invalid email')
    .trim()
    .toLowerCase(),
  message: z.string().min(1, 'Message is required').max(5000, 'Message too long').trim(),
  fax: z.string().optional(),
  website: z.string().optional(),
  formTimestamp: z.number().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function isFormTimestampValid(timestamp: number): boolean {
  const age = Date.now() - timestamp;
  return age >= 3000 && age <= 3_600_000;
}

export function formatZodErrors(error: z.ZodError): string[] {
  return error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
}
