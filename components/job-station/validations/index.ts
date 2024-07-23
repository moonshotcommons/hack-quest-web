import * as z from 'zod';

export const salaryTypes = [
  {
    id: 'HOUR',
    label: 'Hour'
  },
  {
    id: 'DAY',
    label: 'Day'
  },
  {
    id: 'WEEK',
    label: 'Week'
  },
  {
    id: 'MONTH',
    label: 'Month'
  },
  {
    id: 'YEAR',
    label: 'Year'
  }
] as const;

export const workModes = [
  {
    id: 'REMOTE',
    label: 'Remote'
  },
  {
    id: 'ONSITE',
    label: 'Onsite'
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

export const salarySchema = z.object({
  type: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']).optional().default('HOUR'),
  min: z.string().optional(),
  max: z.string().optional(),
  currency: z.string().optional()
});

export const companySchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  website: z.string().url({ message: 'Please enter a valid URL' })
});

export const jobSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  workMode: z.enum(['REMOTE', 'ONSITE']).optional().default('REMOTE'),
  location: z.string().optional(),
  wrokType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP']).optional().default('FULL_TIME'),
  salary: salarySchema.optional(),
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
