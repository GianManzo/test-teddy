import { z } from 'zod';

export const authValidator = z.object({
  name: z.string({ required_error: 'name is required' }),
});

export type AuthValidator = z.infer<typeof authValidator>;
