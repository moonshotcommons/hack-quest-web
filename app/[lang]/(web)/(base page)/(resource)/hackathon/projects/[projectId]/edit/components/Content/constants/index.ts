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
  tagline: z.string().min(0),
  technologies: z.string().min(0),
  solvedProblem: z.string().min(0),
  challenges: z.string().min(0),
  teamID: z.string().min(0),
  roomNumber: z.string().min(0),
  figma: z.string().min(0),
  playstore: z.string().min(0),
  googleDrive: z.string().min(0),
  other: z.string().min(0),
  croak: z.boolean(),
  contractLink: z.string().url(),
  projectLink: z.string().url(),
  socialLink: z.string().url(),
  partnerTooling: z.string().min(1).max(360),
  demo: z.string().url(),
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
