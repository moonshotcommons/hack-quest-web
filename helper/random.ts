const starAvatars = [
  '/images/user/star_avatar/maskgroup-0.svg',
  '/images/user/star_avatar/maskgroup-1.svg',
  '/images/user/star_avatar/maskgroup-2.svg',
  '/images/user/star_avatar/maskgroup-3.svg',
  '/images/user/star_avatar/maskgroup-4.svg',
  '/images/user/star_avatar/maskgroup-5.svg',
  '/images/user/star_avatar/maskgroup-6.svg',
  '/images/user/star_avatar/maskgroup-7.svg',
  '/images/user/star_avatar/maskgroup-8.svg',
  '/images/user/star_avatar/maskgroup-9.svg'
];

const peopleAvatars = [
  '/images/user/people_avatar/people_avatar1.svg',
  '/images/user/people_avatar/people_avatar2.svg',
  '/images/user/people_avatar/people_avatar3.svg',
  '/images/user/people_avatar/people_avatar4.svg',
  '/images/user/people_avatar/people_avatar5.svg'
];

export function getRandomAvatars(count: number = 4) {
  const result: { id: string; url: string }[] = [];

  let currentIndex = starAvatars.length;

  while (currentIndex > 0 && result.length < count) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [starAvatars[currentIndex], starAvatars[randomIndex]] = [
      starAvatars[randomIndex],
      starAvatars[currentIndex]
    ];

    result.push({ id: result.length + '', url: starAvatars[currentIndex] });
  }

  return result;
}

export function getRandomPeopleAvatars(count: number = 5) {
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
