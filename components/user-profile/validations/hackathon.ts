import * as z from 'zod';

export const hackathonSchema = z.object({
  projectTitle: z.string().min(1, {
    message: 'Project title is required'
  }),
  hackathonName: z.string().min(1, {
    message: 'Hackathon name is required'
  }),
  description: z.string().optional(),
  winner: z.boolean().optional()
});

export type HackathonSchema = z.infer<typeof hackathonSchema>;
