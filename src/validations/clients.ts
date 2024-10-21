import { z } from 'zod';

export const clientsValidator = z.object({
  name: z.string({ required_error: 'name is required' }).nullable(),
  salary: z.string({ required_error: 'salary is required' }).nullable(),
  companyValue: z
    .string({ required_error: 'companyValue is required' })
    .nullable(),
});

export type ClientsValidator = z.infer<typeof clientsValidator>;
