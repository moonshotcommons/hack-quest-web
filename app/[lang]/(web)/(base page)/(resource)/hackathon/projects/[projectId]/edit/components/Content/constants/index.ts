import { z } from 'zod';

export const formSchema = z.object({
  projectLogo: z.string().url(),
  projectName: z.string().min(1, {
    message: 'Project Name must be at least 2 characters.'
  }),
  location: z.string().min(1),
  prizeTrack: z.string().min(1),
  track: z.string().min(1),
  githubLink: z.string().min(0).optional(),
  isPublic: z.boolean(),
  submitType: z.string().min(0),
  efrog: z.boolean(),
  croak: z.boolean(),
  contractLink: z.string().url(),
  projectLink: z.string().url(),
  socialLink: z.string().url(),
  partnerTooling: z.string().min(1).max(360),
  intro: z
    .string()
    .min(1, {
      message: 'Intro must be at least 2 characters.'
    })
    .max(120, {
      message: 'The intro field cannot exceed 160 characters'
    }),
  detailedIntro: z
    .string()
    .min(1, {
      message: 'detailedIntro must be at least 16 characters.'
    })
    .max(600, {
      message: 'The detailed intro field cannot exceed 600 characters'
    })
});

export type FormSchema = z.infer<typeof formSchema>;
