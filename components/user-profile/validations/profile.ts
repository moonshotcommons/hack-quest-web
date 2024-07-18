import * as zod from 'zod';

export const personalLinks = zod.object({
  twitter: zod.string().optional(),
  linkedIn: zod.string().optional(),
  telegram: zod.string().optional(),
  wechat: zod.string().optional(),
  github: zod.string().optional()
});

export const profileSchema = zod.object({
  nickname: zod.string().optional(),
  email: zod
    .string()
    .email({
      message: 'Please enter a valid email address'
    })
    .optional(),
  bio: zod.string().optional(),
  location: zod.string().optional(),
  techStack: zod.array(zod.string()).optional(),
  personalLinks
});

export type ProfileSchema = zod.infer<typeof profileSchema>;
