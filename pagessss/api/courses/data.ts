import {
  CourseResponse,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import uuid from 'uuid';

export const syntaxCourse: CourseResponse[] = [
  {
    id: uuid?.v4() || '0',
    name: 'Introduction to programming',
    description:
      'This course covers the most basic concepts in programming using Solidity as an example.',
    type: CourseType.SYNTAX,
    level: 'Beginner',
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
    duration: 600,
    aboutDesc:
      'This course covers the most basic concepts in programming using Solidity as an example.',
    unitCount: 5,
    progress: 0.44
  }
];

export const conceptCourse: CourseResponse[] = [
  {
    id: uuid?.v4() || '0',
    type: CourseType.CONCEPT,
    name: 'What is Bitcoin',
    description:
      'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
    aboutDesc: '',
    unitCount: 0,
    duration: 600,
    progress: 0
  },
  {
    id: uuid?.v4() || '0',
    type: CourseType.CONCEPT,
    name: 'What is Bitcoin',
    aboutDesc: '',
    unitCount: 0,
    description:
      'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
    duration: 600,
    progress: 0
  }
];

export const guidedProjectCourse: CourseResponse[] = [
  {
    id: uuid?.v4() || '0',
    type: CourseType.GUIDED_PROJECT,
    name: 'Web 3.0 Programming Advanced',
    level: ['Advanced'],
    aboutDesc: '',
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
    aboutDesc: '',
    description:
      'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
    duration: 456,
    unitCount: 5,
    progress: 0.434546
  }
];

export const teaserCourse: CourseResponse[] = [
  {
    id: uuid?.v4() || '0',
    type: CourseType.TEASER,
    name: 'Deploy Coin',
    description: 'Create your own token in just 10 mins! ',
    duration: 635,
    aboutDesc: '',
    unitCount: 5,
    progress: 0
  },
  {
    id: uuid?.v4() || '0',
    type: CourseType.TEASER,
    name: 'Deploy Coin',
    aboutDesc: '',
    description: 'Create your own token in just 10 mins! ',
    duration: 165,
    unitCount: 5,
    progress: 0
  },
  {
    id: uuid?.v4() || '0',
    type: CourseType.TEASER,
    name: 'Deploy Coin',
    aboutDesc: '',
    description: 'Create your own token in just 10 mins! ',
    duration: 600,
    unitCount: 5,
    progress: 0
  },
  {
    id: uuid?.v4() || '0',
    type: CourseType.TEASER,
    name: 'Deploy Coin',
    aboutDesc: '',
    description: 'Create your own token in just 10 mins! ',
    duration: 600,
    unitCount: 5,
    progress: 0
  }
];

export const syntaxCourseUnits: CourseUnitType[] = [];
