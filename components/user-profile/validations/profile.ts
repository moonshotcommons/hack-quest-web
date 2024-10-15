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
  email: zod.string().optional(),
  bio: zod.string().optional(),
  location: zod.string().optional(),
  techStack: zod.array(zod.string()).optional(),
  personalLinks: personalLinks.optional()
});

export type ProfileSchema = zod.infer<typeof profileSchema>;

export type PersonalLinks = zod.infer<typeof personalLinks>;

export function isValidUrl(urlString?: string) {
  if (!urlString) return false;
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
}
