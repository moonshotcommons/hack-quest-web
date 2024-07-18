import * as zod from 'zod';

export const hackathonSchema = zod.object({
  title: zod.string().min(1, {
    message: 'Project title is required'
  }),
  name: zod.string().min(1, {
    message: 'Hackathon name is required'
  }),
  description: zod.string().optional(),
  winner: zod.boolean().optional()
});

export type HackathonSchema = zod.infer<typeof hackathonSchema>;
