import { LessonType } from '../components/UgcSidebar/constant';
import { CreationPageKey, LessonTypeDataType } from './type';

export const defaultFormLi = {
  value: '',
  status: 'default',
  errorMessage: ''
};

export const getLessonIconData = (size = 31) => {
  return {
    [LessonType.READING]: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.9 14V14.1H3H8.25H8.35V14V5V4.9H8.25H3H2.9V5V14ZM9.65 14V14.1H9.75H15H15.1V14V5V4.9H15H9.75H9.65V5V14ZM3 15.4C2.61423 15.4 2.28648 15.2638 2.01134 14.9887C1.73619 14.7135 1.6 14.3858 1.6 14V5C1.6 4.61423 1.73619 4.28648 2.01134 4.01134C2.28648 3.73619 2.61423 3.6 3 3.6H15C15.3858 3.6 15.7135 3.73619 15.9887 4.01134C16.2638 4.28648 16.4 4.61423 16.4 5V14C16.4 14.3858 16.2638 14.7135 15.9887 14.9887C15.7135 15.2638 15.3858 15.4 15 15.4H3ZM6.75 12.4H4.5C4.31268 12.4 4.16041 12.3377 4.03634 12.2137C3.91226 12.0896 3.85 11.9373 3.85 11.75C3.85 11.5627 3.91226 11.4104 4.03634 11.2863C4.16041 11.1623 4.31268 11.1 4.5 11.1H6.75C6.93732 11.1 7.08959 11.1623 7.21366 11.2863C7.33774 11.4104 7.4 11.5627 7.4 11.75C7.4 11.9373 7.33774 12.0896 7.21366 12.2137C7.08959 12.3377 6.93732 12.4 6.75 12.4ZM6.75 10.15H4.5C4.31268 10.15 4.16041 10.0877 4.03634 9.96366C3.91227 9.83959 3.85 9.68732 3.85 9.5C3.85 9.31268 3.91227 9.16041 4.03634 9.03634C4.16041 8.91226 4.31268 8.85 4.5 8.85H6.75C6.93732 8.85 7.08959 8.91226 7.21366 9.03634C7.33774 9.16041 7.4 9.31268 7.4 9.5C7.4 9.68732 7.33774 9.83959 7.21366 9.96366C7.08959 10.0877 6.93732 10.15 6.75 10.15ZM6.75 7.9H4.5C4.31268 7.9 4.16041 7.83774 4.03634 7.71366C3.91226 7.58959 3.85 7.43732 3.85 7.25C3.85 7.06268 3.91227 6.91041 4.03634 6.78634C4.16041 6.66227 4.31268 6.6 4.5 6.6H6.75C6.93732 6.6 7.08959 6.66227 7.21366 6.78634C7.33774 6.91041 7.4 7.06268 7.4 7.25C7.4 7.43732 7.33774 7.58959 7.21366 7.71366C7.08959 7.83774 6.93732 7.9 6.75 7.9ZM13.5 12.4H11.25C11.0627 12.4 10.9104 12.3377 10.7863 12.2137C10.6623 12.0896 10.6 11.9373 10.6 11.75C10.6 11.5627 10.6623 11.4104 10.7863 11.2863C10.9104 11.1623 11.0627 11.1 11.25 11.1H13.5C13.6873 11.1 13.8396 11.1623 13.9637 11.2863C14.0877 11.4104 14.15 11.5627 14.15 11.75C14.15 11.9373 14.0877 12.0896 13.9637 12.2137C13.8396 12.3377 13.6873 12.4 13.5 12.4ZM13.5 10.15H11.25C11.0627 10.15 10.9104 10.0877 10.7863 9.96366C10.6623 9.83959 10.6 9.68732 10.6 9.5C10.6 9.31268 10.6623 9.16041 10.7863 9.03634C10.9104 8.91226 11.0627 8.85 11.25 8.85H13.5C13.6873 8.85 13.8396 8.91226 13.9637 9.03634C14.0877 9.16041 14.15 9.31268 14.15 9.5C14.15 9.68732 14.0877 9.83959 13.9637 9.96366C13.8396 10.0877 13.6873 10.15 13.5 10.15ZM13.5 7.9H11.25C11.0627 7.9 10.9104 7.83774 10.7863 7.71366C10.6623 7.58959 10.6 7.43732 10.6 7.25C10.6 7.06268 10.6623 6.91041 10.7863 6.78634C10.9104 6.66227 11.0627 6.6 11.25 6.6H13.5C13.6873 6.6 13.8396 6.66227 13.9637 6.78634C14.0877 6.91041 14.15 7.06268 14.15 7.25C14.15 7.43732 14.0877 7.58959 13.9637 7.71366C13.8396 7.83774 13.6873 7.9 13.5 7.9Z"
          fill="#3E3E3E"
          stroke="#F4F4F4"
          strokeWidth="0.2"
        />
      </svg>
    ),
    [LessonType.VIDEO]: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.83944 6.45528L5.4118 3.6H6.6882L8.16056 6.54472L8.1882 6.6H8.25H10.5H10.6618L10.5894 6.45528L9.1618 3.6H10.4382L11.9106 6.54472L11.9382 6.6H12H14.25H14.4118L14.3394 6.45528L12.9118 3.6H15C15.3858 3.6 15.7135 3.73619 15.9887 4.01134C16.2638 4.28648 16.4 4.61423 16.4 5V14C16.4 14.3858 16.2638 14.7135 15.9887 14.9887C15.7135 15.2638 15.3858 15.4 15 15.4H3C2.61423 15.4 2.28648 15.2638 2.01134 14.9887C1.73619 14.7135 1.6 14.3858 1.6 14V5C1.6 4.61423 1.73619 4.28648 2.01134 4.01134C2.27181 3.75086 2.57943 3.61492 2.93878 3.60116L4.41056 6.54472L4.4382 6.6H4.5H6.75H6.9118L6.83944 6.45528ZM3 7.9H2.9V8V14V14.1H3H15H15.1V14V8V7.9H15H3Z"
          fill="#3E3E3E"
          stroke="white"
          strokeWidth="0.2"
        />
      </svg>
    ),
    [LessonType.QUIZ]: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9643 9.13963L13.9645 9.13946C14.0675 9.03638 14.1803 8.96356 14.3029 8.91898C14.4302 8.87271 14.5561 8.85 14.6813 8.85C14.8184 8.85 14.9493 8.87565 15.0746 8.92693C15.199 8.9778 15.313 9.05443 15.4168 9.15821L16.1084 9.84985C16.2001 9.95345 16.2715 10.0681 16.3231 10.1941C16.3748 10.3206 16.4 10.4452 16.4 10.5688C16.4 10.6939 16.3773 10.8235 16.3306 10.9578C16.2857 11.0866 16.2129 11.202 16.1105 11.3043L12.2105 15.2043C12.1446 15.2702 12.0715 15.3187 11.991 15.3509C11.9089 15.3837 11.8247 15.4 11.7375 15.4H10.5C10.3127 15.4 10.1604 15.3377 10.0363 15.2137C9.91226 15.0896 9.85 14.9373 9.85 14.75V13.5125C9.85 13.4253 9.86628 13.3411 9.8991 13.259C9.93131 13.1785 9.97976 13.1054 10.0456 13.0395C10.0457 13.0395 10.0457 13.0395 10.0457 13.0395L13.9643 9.13963ZM10.775 14.375V14.475H10.875H11.5875H11.6292L11.6585 14.4454L13.9273 12.1579L13.9955 12.0891L13.9288 12.0187L13.5913 11.6625L13.5915 11.6624L13.5875 11.6587L13.2313 11.3212L13.1609 11.2545L13.0921 11.3227L10.8046 13.5915L10.775 13.6208V13.6625V14.375ZM3.75 10.9C3.56268 10.9 3.41041 10.8377 3.28634 10.7137C3.16226 10.5896 3.1 10.4373 3.1 10.25C3.1 10.0627 3.16226 9.91041 3.28634 9.78634C3.41041 9.66226 3.56268 9.6 3.75 9.6H7.5C7.68732 9.6 7.83959 9.66226 7.96366 9.78634C8.08774 9.91041 8.15 10.0627 8.15 10.25C8.15 10.4373 8.08774 10.5896 7.96366 10.7137C7.83959 10.8377 7.68732 10.9 7.5 10.9H3.75ZM3.75 7.9C3.56268 7.9 3.41041 7.83774 3.28634 7.71366C3.16226 7.58959 3.1 7.43732 3.1 7.25C3.1 7.06268 3.16226 6.91041 3.28634 6.78634C3.41041 6.66227 3.56268 6.6 3.75 6.6H10.5C10.6873 6.6 10.8396 6.66227 10.9637 6.78634C11.0877 6.91041 11.15 7.06268 11.15 7.25C11.15 7.43732 11.0877 7.58959 10.9637 7.71366C10.8396 7.83774 10.6873 7.9 10.5 7.9H3.75ZM3.75 4.9C3.56268 4.9 3.41041 4.83774 3.28634 4.71366C3.16226 4.58959 3.1 4.43732 3.1 4.25C3.1 4.06268 3.16226 3.91041 3.28634 3.78634C3.41041 3.66226 3.56268 3.6 3.75 3.6H10.5C10.6873 3.6 10.8396 3.66226 10.9637 3.78634C11.0877 3.91041 11.15 4.06268 11.15 4.25C11.15 4.43732 11.0877 4.58959 10.9637 4.71366C10.8396 4.83774 10.6873 4.9 10.5 4.9H3.75Z"
          fill="#3E3E3E"
          stroke="white"
          strokeWidth="0.2"
        />
      </svg>
    )
  };
};

export const lessonTypeData: LessonTypeDataType[] = [
  {
    value: LessonType.READING,
    label: 'Reading Lesson',
    icon: getLessonIconData()[LessonType.READING],
    description:
      'You can present content using words and images, ideal for detailed explanations and textual resources.'
  },
  {
    value: LessonType.VIDEO,
    label: 'Video Lesson',
    icon: getLessonIconData()[LessonType.VIDEO],
    description:
      'Video lesson begins with an uploaded video, enhancing the learning experience with additional words and images for a comprehensive approach.'
  },
  {
    value: LessonType.QUIZ,
    label: 'Quiz',
    icon: getLessonIconData()[LessonType.QUIZ],
    description:
      'You assess student understanding by creating questions and answers, adding an interactive element to reinforce key concepts.'
  }
];

export const lessonIdKeys = [
  CreationPageKey.Introduction,
  CreationPageKey.IntendedLearners,
  CreationPageKey.KnowledgeGain,
  CreationPageKey.GetYourReady,
  CreationPageKey.Curriculum
];
