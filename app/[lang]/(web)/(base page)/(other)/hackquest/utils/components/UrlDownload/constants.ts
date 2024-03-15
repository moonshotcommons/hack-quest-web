export enum URLDownloadType {
  BLOG = 'blog',
  HACKATHON = 'hackathon',
  GLOSSARY = 'glossary',
  PROJECT = 'project'
}

export const dataMap = {
  [URLDownloadType.BLOG]: {
    api: 'blogs',
    route: 'blog'
  },
  [URLDownloadType.HACKATHON]: {
    api: 'hackathons',
    route: 'hackathon'
  },
  [URLDownloadType.GLOSSARY]: {
    api: 'glossaries',
    route: 'glossary'
  },
  [URLDownloadType.PROJECT]: {
    api: 'projects',
    route: 'hackathon/projects'
  }
};
