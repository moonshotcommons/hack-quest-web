import { CourseTrackType } from '@/service/webApi/course/type';

export function getDefaultImageUrl(track: CourseTrackType) {
  switch (track) {
    case CourseTrackType.DeFi:
      return '/images/home/practices_img1.png';
    case CourseTrackType.NFT:
      return '/images/home/practices_img2.png';
    case CourseTrackType.Gaming:
      return '/images/home/practices_img3.png';
    case CourseTrackType.Security:
      return '/images/home/practices_img4.png';
    default:
      return '/images/home/practices_img1.png';
  }
}
