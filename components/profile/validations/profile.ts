import * as zod from 'zod';

export const profileSchema = zod.object({
  name: zod.string().optional(),
  email: zod
    .string()
    .email({
      message: 'Please enter a valid email address'
    })
    .optional(),
  bio: zod.string().optional(),
  location: zod.string().optional()
});

export type ProfileSchema = zod.infer<typeof profileSchema>;
