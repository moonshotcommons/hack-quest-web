import * as zod from 'zod';
import { MONTHS } from '../constants';

export const experienceSchema = zod
  .object({
    title: zod.string().min(1, {
      message: 'Title is required'
    }),
    companyName: zod.string().min(1, {
      message: 'Company is required'
    }),
    employmentType: zod.string({
      required_error: 'Employment type is required'
    }),
    location: zod.string().optional(),
    description: zod.string().optional(),
    startMonth: zod.string({
      required_error: 'Start month is required'
    }),
    startYear: zod.string({
      required_error: 'Start year is required'
    }),
    endMonth: zod.string().optional(),
    endYear: zod.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.endMonth && !data.endYear) {
      ctx.addIssue({
        path: ['endYear'],
        code: zod.ZodIssueCode.custom,
        message: 'End year is required'
      });
    }

    if (!data.endMonth && data.endYear) {
      ctx.addIssue({
        path: ['endMonth'],
        code: zod.ZodIssueCode.custom,
        message: 'End month is required'
      });
    }

    if (data.endMonth && data.endYear) {
      if (Number(data.endYear) < Number(data.startYear)) {
        ctx.addIssue({
          path: ['endYear'],
          code: zod.ZodIssueCode.custom,
          message: 'End year must be greater than start year'
        });
      }

      if (Number(data.endYear) === Number(data.startYear)) {
        const startMonthIndex = MONTHS.indexOf(data.startMonth);
        const endMonthIndex = MONTHS.indexOf(data.endMonth);

        if (endMonthIndex < startMonthIndex) {
          ctx.addIssue({
            path: ['endMonth'],
            code: zod.ZodIssueCode.custom,
            message: 'End month must be greater than start month'
          });
        }
      }
    }
  });

export type ExperienceSchema = zod.infer<typeof experienceSchema>;
