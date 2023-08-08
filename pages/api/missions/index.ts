import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MissionDataType,
  MissionType,
  MissionSubType,
  BeginnerRewardsType
} from '@/service/webApi/missionCenter/type';
import { v4 as uuidv4 } from 'uuid';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMethodHandler(req, res);
    case 'POST':
      return postMethodHandler(req, res);
    default:
      return res.status(200).json({ name: 'John Doe' });
  }
}

const getMethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse<MissionDataType[]>
) => {
  res.status(200).json([
    {
      id: uuidv4(), // mission id
      name: 'Complete 5 Quest',
      description: 'Complete 5 Quest',
      icon: '',
      type: MissionType.DAILY_QUESTS,
      subType: '',
      exp: 5,
      progress: {
        id: uuidv4(), // mission progress id
        completed: true,
        claimed: true,
        progress: [5, 5]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 10 Quest',
      description: 'Complete 10 Quest',
      icon: '',
      type: MissionType.DAILY_QUESTS,
      subType: '',
      exp: 10,
      progress: {
        id: uuidv4(),
        completed: false,
        claimed: false,
        progress: [5, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 10 Quest',
      description: 'Complete 10 Quest',
      icon: '',
      type: MissionType.DAILY_QUESTS,
      subType: '',
      exp: 10,
      progress: {
        id: uuidv4(),
        completed: false,
        claimed: false,
        progress: [5, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.COURSE_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.COURSE_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: false,
        claimed: false,
        progress: [3, 7]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.COURSE_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.QUEST_WINNING_STREAK,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 30]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.QUEST_WINNING_STREAK,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: false,
        claimed: false,
        progress: [3, 20]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.QUEST_WINNING_STREAK,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 20]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.TRACK_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.TRACK_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 10]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.TRACK_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: true,
        progress: [3, 20]
      }
    },
    {
      id: uuidv4(),
      name: 'Complete 3 Syntax',
      description: 'Complete 3 Syntax',
      icon: '',
      type: MissionType.MILESTONES,
      subType: MissionSubType.TRACK_COMPLETION,
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: [3, 10]
      }
    },
    {
      id: uuidv4(),
      name: '7 Days Signup Streak',
      description: '7 Days Signup Streak',
      icon: '',
      type: MissionType.SEVEN_DAYS_SIGNUP,
      subType: '',
      exp: 10, // exp of day 1/7
      progress: {
        id: uuidv4(),
        completed: true, // For SEVEN_DAYS_SIGNUP, 'completed' will always be true
        claimed: false,
        progress: [2, 7] // e.g. 1/7, 2/7, 5/7
      }
    },
    {
      id: uuidv4(),
      name: 'Join Discord',
      description: 'Join Our Discord community',
      icon: '',
      type: BeginnerRewardsType.FOLLOW_TWITTER,
      subType: '',
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: []
      }
    },
    {
      id: uuidv4(),
      name: 'Join Discord',
      description: 'Updates profile pictures and username',
      icon: '',
      type: BeginnerRewardsType.UPDATE_PROFILE,
      subType: '',
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: []
      }
    },
    {
      id: uuidv4(),
      name: 'Join Discord',
      description: 'Updates profile pictures and username',
      icon: '',
      type: BeginnerRewardsType.UPDATE_PROFILE,
      subType: '',
      exp: 25,
      progress: {
        id: uuidv4(),
        completed: true,
        claimed: false,
        progress: []
      }
    }
  ]);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
