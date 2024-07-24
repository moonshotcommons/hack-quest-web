import * as z from 'zod';

export const workModes = [
  {
    id: 'REMOTE',
    label: 'Remote'
  },
  {
    id: 'ONSITE',
    label: 'On-Site'
  }
] as const;

export const workTypes = [
  {
    id: 'FULL_TIME',
    label: 'Full-time'
  },
  {
    id: 'PART_TIME',
    label: 'Part-time'
  },
  {
    id: 'INTERNSHIP',
    label: 'Internship'
  }
] as const;

export const currencies = [
  {
    id: 'USD',
    label: 'USD - US Dollar $'
  },
  {
    id: 'EUR',
    label: 'EUR - Euro €'
  },
  {
    id: 'RMB',
    label: 'RMB - Chinese Yuan ¥'
  },
  {
    id: 'INR',
    label: 'INR - Indian Rupee ₹'
  },
  {
    id: 'SGD',
    label: 'SGD - Singapore Dollar SGD'
  },
  {
    id: 'MYR',
    label: 'MYR - Malaysian Ringgit RM'
  },
  {
    id: 'JPY',
    label: 'JPY - Japanese Yen ¥'
  },
  {
    id: 'GBP',
    label: 'GBP - British Pound £'
  }
] as const;

export const salarySchema = z.object({
  min: z.string().optional(),
  max: z.string().optional(),
  currency: z.string().optional()
});

export const companySchema = z.object({
  companyName: z
    .string({
      required_error: 'Company name is required'
    })
    .min(1, { message: 'Company name is required' }),
  website: z
    .string({
      required_error: 'Website is required'
    })
    .url({ message: 'Please enter a valid URL' })
});

export const jobSchema = z.object({
  name: z.string().min(1, { message: 'Job title is required' }),
  workMode: z.enum(['REMOTE', 'ONSITE']).optional().default('REMOTE'),
  location: z.string().optional(),
  wrokType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP']).optional().default('FULL_TIME'),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  currency: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional()
});

export const contactSchema = z.object({
  link: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  telegram: z.string().optional(),
  wechat: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email' }).optional()
});

export const formSchema = z.object({
  ...jobSchema.shape,
  ...companySchema.shape,
  ...contactSchema.shape,
  status: z.enum(['open', 'closed']).optional().default('open')
});
