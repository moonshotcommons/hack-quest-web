import { ReactNode } from 'react';
import { CourseContentType, CourseInformationType } from '../../constant/type';

export enum LessonType {
  READING = 'READING',
  VIDEO = 'VIDEO',
  QUIZ = 'QUIZ'
}

export const lessonTypeData: Record<
  string,
  { label: string; icon: ReactNode }
> = {
  [LessonType.READING]: {
    label: 'Reading',
    icon: (
      <svg
        width="18"
        height="19"
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
    )
  },
  [LessonType.VIDEO]: {
    label: 'Video',
    icon: (
      <svg
        width="18"
        height="19"
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
    )
  },
  [LessonType.QUIZ]: {
    label: 'Quiz',
    icon: (
      <svg
        width="18"
        height="19"
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
  }
};

export const mockData: unknown = {
  id: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
  name: 'Fungible Token',
  title: 'Fungible Token',
  subTitle: null,
  description:
    'Here we will write our first project which is a fungible token that users could mint, check balance, and transfer.',
  image: null,
  type: 'GUIDED_PROJECT',
  optional: {},
  level: 'BEGINNER',
  language: 'SOLIDITY',
  track: 'DeFi',
  creatorId: null,
  duration: 90,
  peopleJoined: 54,
  status: 'enable',
  createdAt: '2023-09-06T03:52:09.632Z',
  updatedAt: '2023-12-14T04:30:02.610Z',
  units: [
    {
      id: '81b59a7e-29c7-401c-bc1d-d76e9d579fc7',
      name: 'Setup Contract',
      title: 'Setup Contract',
      description:
        'start to write a contract with defining compiler version, creating a contract and define constructor.',
      sequence: 0,
      createdAt: '2023-09-06T03:54:46.952Z',
      updatedAt: '2023-12-08T09:45:36.230Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: '6547abaa-afc4-48e0-8066-d185329ff651',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '81b59a7e-29c7-401c-bc1d-d76e9d579fc7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '788b2580-36e4-4ca5-afc9-7453731212c7',
          name: 'Define compiler Version',
          type: 'READING',
          sequence: 1,
          unitId: '81b59a7e-29c7-401c-bc1d-d76e9d579fc7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: 'a6ac2e50-56ef-40cd-9577-45111b1c3335',
          name: 'Create a Contract',
          type: 'READING',
          sequence: 2,
          unitId: '81b59a7e-29c7-401c-bc1d-d76e9d579fc7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '517d3bf3-10e0-41d7-a22c-5b74e52e6107',
          name: 'Define Constructor',
          type: 'READING',
          sequence: 3,
          unitId: '81b59a7e-29c7-401c-bc1d-d76e9d579fc7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: '81e458ca-019e-4655-ac44-82dbeee93920',
      name: 'Define Key Variables',
      title: 'Define Key Variables',
      description:
        'Define three key variables including balances of type mapping, totalSupply of type uint256, owner of type address.',
      sequence: 1,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:46:06.492Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: '3340b771-9858-4717-b2f5-ed9cc3698f55',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '66d72829-9aa0-4dd7-ac67-99b3a010f22f',
          name: 'Definition of Balances Mapping',
          type: 'READING',
          sequence: 1,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '608f4217-9c91-45ef-bffc-2f63f367ab01',
          name: 'Define totalSupply as an integer',
          type: 'READING',
          sequence: 2,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '00b8e325-3837-46a8-bffc-35d26153f396',
          name: 'Define owner address',
          type: 'READING',
          sequence: 3,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: 'fa6a7aa6-d0ab-47bb-80b5-bf0098f3ef2c',
          name: 'Restricting the owner in the constructor',
          type: 'READING',
          sequence: 4,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '49e353e6-305b-4834-a337-3142a25b8cba',
          name: 'Interaction',
          type: 'READING',
          sequence: 5,
          unitId: '81e458ca-019e-4655-ac44-82dbeee93920',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
      name: 'Mint - 1',
      title: 'Mint - 1',
      description: 'Start to write the mint function',
      sequence: 2,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:47:14.548Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: '5d118ebf-c6ef-48e0-8f35-bcaf55db2777',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '97365682-5b20-4e2a-80a3-290dce83208b',
          name: 'Define the mint function',
          type: 'READING',
          sequence: 1,
          unitId: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: 'eb182b03-b376-470e-a5df-c16b99a1e7be',
          name: 'Authorization Control',
          type: 'READING',
          sequence: 2,
          unitId: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '84747913-bb1f-4f4d-8bac-97f5afb01543',
          name: 'Update Balances',
          type: 'READING',
          sequence: 3,
          unitId: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '532137db-4c1e-4733-8dbd-1b4c696d2c6e',
          name: 'Update totalSupply',
          type: 'READING',
          sequence: 4,
          unitId: 'b0b07061-1c6f-412e-aa15-91a1c98b1b57',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: '5ed8c2d7-f852-4a8c-89f0-867c7ffdec7e',
      name: 'Mint - 2',
      title: 'Mint - 2',
      description: 'complete the mint function',
      sequence: 3,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:47:49.408Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: '78e1acd2-b1f2-43b9-a9e4-a66f26664bba',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '5ed8c2d7-f852-4a8c-89f0-867c7ffdec7e',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '6e98213b-7f7a-431d-b794-d1a91236c63a',
          name: 'mint the initial supply of tokens',
          type: 'READING',
          sequence: 1,
          unitId: '5ed8c2d7-f852-4a8c-89f0-867c7ffdec7e',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '49cea73a-02f3-4ccd-aca3-9785d3f93fb6',
          name: 'Interaction',
          type: 'READING',
          sequence: 2,
          unitId: '5ed8c2d7-f852-4a8c-89f0-867c7ffdec7e',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: '980a0f0c-741f-43f5-b0f7-02effcabbd02',
      name: 'balanceOf',
      title: 'balanceOf',
      description: 'Write the balanceOf function',
      sequence: 4,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:48:22.309Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: '74a6056c-acba-4902-b39a-be397f707d08',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '980a0f0c-741f-43f5-b0f7-02effcabbd02',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '1846f806-1d91-4edf-af97-01e8a0a51444',
          name: 'Define the balanceOf Function',
          type: 'READING',
          sequence: 1,
          unitId: '980a0f0c-741f-43f5-b0f7-02effcabbd02',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '6b955365-89c1-44c8-84d4-c31b84c22d7b',
          name: 'Return the balance of the corresponding address',
          type: 'READING',
          sequence: 2,
          unitId: '980a0f0c-741f-43f5-b0f7-02effcabbd02',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '2fb4b7d1-f425-45d2-a131-d3eee10c4ab8',
          name: 'Interaction',
          type: 'READING',
          sequence: 3,
          unitId: '980a0f0c-741f-43f5-b0f7-02effcabbd02',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: '693ad8a4-33af-4f46-b582-0ac7b49b0423',
      name: 'Transfer - 1',
      title: 'Transfer - 1',
      description: 'Start to write the transfer function.',
      sequence: 5,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:49:01.172Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: 'caa1ba68-e8d5-4c71-ad71-3339890e985a',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '693ad8a4-33af-4f46-b582-0ac7b49b0423',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '0d7bd969-481f-406d-88db-65d5f02c73cc',
          name: 'Define the transfer function',
          type: 'READING',
          sequence: 1,
          unitId: '693ad8a4-33af-4f46-b582-0ac7b49b0423',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '1e4a4034-0871-40df-8440-ae527da0e22e',
          name: 'Parameter Check',
          type: 'READING',
          sequence: 2,
          unitId: '693ad8a4-33af-4f46-b582-0ac7b49b0423',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: 'd9dd1ef4-b84c-4b5e-b068-9865f685fc3a',
          name: 'Updating the balance of the transferor',
          type: 'READING',
          sequence: 3,
          unitId: '693ad8a4-33af-4f46-b582-0ac7b49b0423',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    },
    {
      id: '0412de42-ee3c-4711-8555-273dafdb25b7',
      name: 'Transfer - 2',
      title: 'Transfer - 2',
      description: 'complete the transfer function',
      sequence: 6,
      createdAt: '2023-09-06T03:54:46.953Z',
      updatedAt: '2023-12-08T09:49:34.215Z',
      courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a',
      pages: [
        {
          id: 'b77fdfbf-851a-4bba-8e55-66e768fb1da2',
          name: 'Preface',
          type: 'READING',
          sequence: 0,
          unitId: '0412de42-ee3c-4711-8555-273dafdb25b7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '0328a627-8da3-4454-98a3-b0bd4afdebb1',
          name: 'Update the balance of the recipient',
          type: 'READING',
          sequence: 1,
          unitId: '0412de42-ee3c-4711-8555-273dafdb25b7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '0567e9c3-6bcc-41c3-946b-64da2638bef0',
          name: 'Return true',
          type: 'READING',
          sequence: 2,
          unitId: '0412de42-ee3c-4711-8555-273dafdb25b7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        },
        {
          id: '19a34995-364c-4306-938b-00ca79066b76',
          name: 'Interaction',
          type: 'READING',
          sequence: 3,
          unitId: '0412de42-ee3c-4711-8555-273dafdb25b7',
          courseId: '6a3ab921-b5fb-4ac0-961b-4e5d81f99d7a'
        }
      ]
    }
  ]
};

export const mockLessonReadingData: any = {
  id: 'a7dea7e4-b281-41a1-ab33-ad67b1ee3ba1',
  name: 'What is Hyper Oracle?',
  title: 'What is Hyper Oracle?',
  type: 'READING',
  content: {
    type: 'Content',
    title: 'What is Hyper Oracle?',
    children: [
      {
        id: '1e930bb1-9790-4342-a98b-dd22de663d30',
        type: 'heading_3',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'Concept'
              },
              type: 'text',
              plain_text: 'Concept',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ],
          is_toggleable: false
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: 'a02b97c7-40cf-4a52-944e-9fb5f4ffc5a5',
        type: 'paragraph',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content:
                  'Hyper Oracle is a protocol and network for programmable zero-knowledge oracle that preserves blockchain security and decentralization.'
              },
              type: 'text',
              plain_text:
                'Hyper Oracle is a protocol and network for programmable zero-knowledge oracle that preserves blockchain security and decentralization.',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: '748047da-470f-4d66-be71-b43167679aee',
        type: 'paragraph',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content:
                  'From indexing to smart contract automation, Hyper Oracle’s zkGraph Standards make onchain data and onchain-equivalent computation useful and verifiable with fast finality. Hyper Oracle empowers developers to interact with blockchain in new ways.'
              },
              type: 'text',
              plain_text:
                'From indexing to smart contract automation, Hyper Oracle’s zkGraph Standards make onchain data and onchain-equivalent computation useful and verifiable with fast finality. Hyper Oracle empowers developers to interact with blockchain in new ways.',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: '59c250bf-660b-4434-a6eb-ec905d88ca75',
        type: 'paragraph',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content:
                  'Staking is the traditional, incentive-based security mechanism for oracles and other middleware infrastructure. Hyper Oracle replaces this incentive-based system with one based on zero-knowledge proofs (ZKP).'
              },
              type: 'text',
              plain_text:
                'Staking is the traditional, incentive-based security mechanism for oracles and other middleware infrastructure. Hyper Oracle replaces this incentive-based system with one based on zero-knowledge proofs (ZKP).',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: 'ea58a0ce-5878-4483-9044-b45fb7fbb83e',
        type: 'heading_3',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'How Hyper Oracle Works'
              },
              type: 'text',
              plain_text: 'How Hyper Oracle Works',
              annotations: {
                bold: true,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ],
          is_toggleable: false
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: 'fba4d832-0a22-4c80-97bb-c8bf113fd1a9',
        type: 'paragraph',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content:
                  'Hyper Oracle provides infrastructure, including automation and indexing, that empowers developers to build end-to-end trustless and decentralized applications.'
              },
              type: 'text',
              plain_text:
                'Hyper Oracle provides infrastructure, including automation and indexing, that empowers developers to build end-to-end trustless and decentralized applications.',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: '7ff98e85-f011-44e3-b1c3-f75b3d3fab41',
        type: 'paragraph',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'Hyper Oracle is a decentralized protocol and network:'
              },
              type: 'text',
              plain_text:
                'Hyper Oracle is a decentralized protocol and network:',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: 'ca2e601f-9b5e-497a-82bf-6b611e96a096',
        type: 'bulleted_list_item',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'Used by Developers'
              },
              type: 'text',
              plain_text: 'Used by Developers',
              annotations: {
                bold: true,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            },
            {
              href: null,
              text: {
                link: null,
                content:
                  ': Developers can define custom computations with JavaScript, register those computations to Hyper Oracle protocol, and utilize Hyper Oracle zkGraph standard to automate or supercharge their smart contracts.'
              },
              type: 'text',
              plain_text:
                ': Developers can define custom computations with JavaScript, register those computations to Hyper Oracle protocol, and utilize Hyper Oracle zkGraph standard to automate or supercharge their smart contracts.',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      },
      {
        id: '80334c76-6244-4d33-b514-2e23a1250fff',
        type: 'bulleted_list_item',
        parent: {
          type: 'page_id',
          page_id: '008dfcd2-c0c4-4c9a-a1d7-c1c537c02478'
        },
        content: {
          color: 'default',
          rich_text: [
            {
              href: null,
              text: {
                link: null,
                content: 'Operated by zkOracle Nodes'
              },
              type: 'text',
              plain_text: 'Operated by zkOracle Nodes',
              annotations: {
                bold: true,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            },
            {
              href: null,
              text: {
                link: null,
                content:
                  ': Node operators can run zkOracle nodes to execute and generate zero-knowledge proofs for developer-defined computations.'
              },
              type: 'text',
              plain_text:
                ': Node operators can run zkOracle nodes to execute and generate zero-knowledge proofs for developer-defined computations.',
              annotations: {
                bold: false,
                code: false,
                color: 'default',
                italic: false,
                underline: false,
                strikethrough: false
              }
            }
          ]
        },
        isToggle: false,
        isCustomType: false
      }
    ],
    isToggle: true,
    notionType: 'heading_1',
    isCustomType: true
  },
  sequence: 0,
  createdAt: '2024-01-11T03:12:05.688Z',
  updatedAt: '2023-12-20T06:58:56.451Z',
  unitId: 'f2002496-d0c5-43de-8a6c-cf25981ef9a7',
  courseId: 'dd923df3-6f28-4e2b-b2c3-9418f8d143cb',
  state: 0
};

export const labelMaps: Record<
  keyof CourseInformationType | keyof CourseContentType,
  string
> = {
  introduction: 'Introduction',
  intendedLearners: 'Intended Learners',
  knowledgeGain: 'Knowledge Gain',
  getYourReady: 'Get Yourself Ready ',
  curriculum: 'Curriculum'
};

export type LessonReadingData = typeof mockLessonReadingData;
