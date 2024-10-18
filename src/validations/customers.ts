import { z } from 'zod';

export const customersValidator = z.object({
  name: z.string({ required_error: 'name is required' }),
  salary: z.string({ required_error: 'salary is required' }),
  companyValue: z.string({ required_error: 'companyValue is required' }),
});

export type CustomersValidator = z.infer<typeof customersValidator>;
