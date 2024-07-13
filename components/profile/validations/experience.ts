import * as zod from 'zod';

export const experienceSchema = zod.object({
  title: zod.string().min(1, {
    message: 'Title is required'
  }),
  companyName: zod.string().min(1, {
    message: 'Company is required'
  }),
  employmentType: zod.string().optional(),
  location: zod.string().optional(),
  description: zod.string().optional(),
  startMonth: zod.string().optional(),
  startYear: zod.string().optional(),
  endMonth: zod.string().optional(),
  endYear: zod.string().optional()
});

export type ExperienceSchema = zod.infer<typeof experienceSchema>;
