import { CourseType } from '@/service/webApi/course/type';
import uuid from 'uuid';
export const learningTrackDetail = {
  id: '6123a6a8-5994-4848-8d17-d13280bd1a88',
  name: 'Solidity 101',
  description:
    'This is the first intro-level course on Solidity programming. We assume limited CS background and no web3 experience of students. ',
  aboutDesc: [],
  type: CourseType.LEARNING_TRACK,
  level: 'BEGINNER',
  duration: 90,
  progress: 0,
  peopleJoined: 345,
  courses: [
    {
      id: uuid?.v4() || '0',
      type: CourseType.GUIDED_PROJECT,
      name: 'Web 3.0 Programming Advanced',
      level: ['Advanced'],
      aboutDesc: [],
      group: '测试group1',
      description:
        'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
      duration: 645,
      unitCount: 5,
      progress: 0.4898
    },
    {
      id: uuid?.v4() || '0',
      type: CourseType.GUIDED_PROJECT,
      name: 'Web 3.0 Programming Advanced',
      level: ['Advanced'],
      aboutDesc: [],
      group: '测试group1',
      description:
        'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
      duration: 456,
      unitCount: 5,
      progress: 0.434546
    },
    {
      id: uuid?.v4() || '0',
      name: 'Introduction to programming',
      description:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      type: CourseType.SYNTAX,
      level: 'Beginner',
      group: '测试group2',
      duration: 600,
      aboutDesc:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      unitCount: 5,
      progress: 0.44
    },
    {
      id: uuid?.v4() || '0',
      name: 'Introduction to programming',
      description:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      type: CourseType.SYNTAX,
      level: 'Beginner',
      group: '测试group2',
      duration: 600,
      aboutDesc:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      unitCount: 5,
      progress: 0.44
    },
    {
      id: uuid?.v4() || '0',
      name: 'Introduction to programming',
      description:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      type: CourseType.SYNTAX,
      level: 'Beginner',
      group: '测试group3',
      duration: 600,
      aboutDesc:
        'This course covers the most basic concepts in programming using Solidity as an example.',
      unitCount: 5,
      progress: 0.44
    }
  ]
};
