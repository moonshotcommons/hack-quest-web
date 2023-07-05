import Avatar1 from '@/public/images/user/maskgroup-0.svg';

const peopleAvatars = [
  '/images/user/maskgroup-0.svg',
  '/images/user/maskgroup-1.svg',
  '/images/user/maskgroup-2.svg',
  '/images/user/maskgroup-3.svg',
  '/images/user/maskgroup-4.svg',
  '/images/user/maskgroup-5.svg',
  '/images/user/maskgroup-6.svg',
  '/images/user/maskgroup-7.svg',
  '/images/user/maskgroup-8.svg',
  '/images/user/maskgroup-9.svg'
];

export function getRandomAvatars(count: number = 4) {
  const result: { id: string; url: string }[] = [];

  let currentIndex = peopleAvatars.length;

  while (currentIndex > 0 && result.length < count) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [peopleAvatars[currentIndex], peopleAvatars[randomIndex]] = [
      peopleAvatars[randomIndex],
      peopleAvatars[currentIndex]
    ];

    result.push({ id: result.length + '', url: peopleAvatars[currentIndex] });
  }

  return result;
}
