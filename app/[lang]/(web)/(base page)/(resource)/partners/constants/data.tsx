export const countData = [
  {
    id: 1,
    label: 'learnerNetwork',
    number: 83
  },
  {
    id: 2,
    label: 'onlinePrograms',
    number: 4500
  },
  {
    id: 3,
    label: 'hackathonProjectsPartners',
    number: 200
  },
  {
    id: 4,
    label: 'ventureBackedProjects',
    number: 65
  }
];

export const partnerList = [
  { name: 'Solana', tags: ['Blockchain'], img: '', description: '' },
  { name: 'ZhenFund', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Find Satoshi Lab', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Nanyang Technological University', tags: ['University'], img: '', description: '' },
  { name: 'THUBA', tags: ['University'], img: '', description: '' },
  { name: 'HKUST Crypto Lab', tags: ['University'], img: '', description: '' },
  { name: 'StepN', tags: ['dApps'], img: '', description: '' },
  { name: 'ThirdWeb', tags: ['Development'], img: '', description: '' },
  { name: 'QuickNode', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'Rebase', tags: ['Community'], img: '', description: '' },
  { name: 'Odaily', tags: ['Media'], img: '', description: '' },
  { name: 'Techflow', tags: ['Media'], img: '', description: '' },
  { name: 'PANEWS', tags: ['Media'], img: '', description: '' },
  { name: 'Blockbeats', tags: ['Media'], img: '', description: '' },
  { name: 'ChainCather', tags: ['Media'], img: '', description: '' },
  { name: 'Rootdata', tags: ['dApps'], img: '', description: '' },
  { name: 'Chainbase', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'Particle Network', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'RSS3', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'IoTex', tags: ['Blockchain'], img: '', description: '' },
  { name: 'IOSG ', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'HashKey Capital', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'SevenX ventures', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Hash Global', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Ready Player Club', tags: ['Community'], img: '', description: '' },
  { name: 'Manta Network', tags: ['Blockchain'], img: '', description: '' },
  { name: 'Moonshot Commons', tags: ['Community'], img: '', description: '' },
  { name: 'Mask Network', tags: ['dApps'], img: '', description: '' },
  { name: 'Mirror World', tags: ['dApps'], img: '', description: '' },
  { name: 'Aspecta', tags: ['dApps'], img: '', description: '' },
  { name: 'Qiming Ventures', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Signum Capital', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'ChainIDE', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'Paeonia Ventures', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Bytetrade Lab', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Atlas Capital 知春资本', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Moveflow', tags: ['dApps'], img: '', description: '' },
  { name: 'magipop', tags: ['dApps'], img: '', description: '' },
  { name: 'versa wallet', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'allsto', tags: ['dApps'], img: '', description: '' },
  { name: 'Blade Game', tags: ['dApps'], img: '', description: '' },
  { name: 'Ethsign ', tags: ['dApps'], img: '', description: '' },
  { name: 'KNN3 ', tags: ['dApps'], img: '', description: '' },
  { name: 'Y2Z Ventures', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Initiate Capital', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'LXDao', tags: ['Community'], img: '', description: '' },
  { name: 'OKX Wallet', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'Biget Wallet', tags: ['Infrastructure'], img: '', description: '' },
  { name: 'Foresight Ventures', tags: ['Venture', 'Capital'], img: '', description: '' },
  { name: 'Foresight News', tags: ['Media'], img: '', description: '' }
];

let partnerTagsString: string[] = [];
partnerList.forEach((v) => {
  partnerTagsString = [...partnerTagsString, ...(v.tags || [])];
});
export const partnerTags = ['', ...new Set(partnerTagsString)].map((v) => {
  const obj = !v
    ? {
        label: 'All Regions',
        value: ''
      }
    : {
        label: v,
        value: v
      };
  return obj;
});
