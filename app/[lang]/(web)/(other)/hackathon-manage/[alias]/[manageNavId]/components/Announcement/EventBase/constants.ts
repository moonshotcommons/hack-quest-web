import { TitleEnum } from '@/service/webApi/hackathon/types';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';

export enum AnnouncementEvent {
  Registration = 'Registration',
  Submission = 'Submission',
  Voting = 'Voting',
  Reward = 'Reward',
  Judging = 'Judging'
}

export enum TimelineStatus {
  ACTIVE = 'ACTIVE',
  UPCOMING = 'UPCOMING',
  END = 'END'
}

export enum PhaseEnum {
  REGISTRATION_SUBMISSION = 'REGISTRATION&SUBMISSION',
  VOTING = 'VOTING',
  BEFORE_WINNER = 'BEFORE_WINNER',
  AFTER_WINNER = 'AFTER_WINNER'
}

// hackathon的类型
export enum HackathonAnnouncementType {
  HYBRID_HACKQUEST = 'HYBRID_HACKQUEST',
  HYBRID_NO_HACKQUEST = 'HYBRID_NO_HACKQUEST',
  ONLINE_HACKQUEST = 'ONLINE_HACKQUEST',
  ONLINE_NO_HACKQUEST = 'ONLINE_NO_HACKQUEST'
}

export const AnnouncementsEvent = [
  {
    type: AnnouncementEvent.Registration,
    title: AnnouncementEvent.Registration,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.END,
    templates: [
      {
        type: 'Approval',
        title: 'Approval Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.END
      },
      {
        type: 'Decline',
        title: 'Decline Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.END
      },
      {
        type: 'Waitlist',
        title: 'Waitlist Notification',
        description: 'Message sent to applicants when their applications are waitlisted*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.END
      }
    ]
  },
  {
    type: AnnouncementEvent.Submission,
    title: AnnouncementEvent.Submission,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE,
    templates: [
      {
        type: 'Deadline',
        title: 'Deadline Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Submit',
        title: 'Submit Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      }
    ]
  },
  {
    type: AnnouncementEvent.Voting,
    title: AnnouncementEvent.Voting,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
    templates: [
      {
        type: 'Start',
        title: 'Start Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'End',
        title: 'End Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
      }
    ]
  },
  {
    type: AnnouncementEvent.Reward,
    title: AnnouncementEvent.Reward,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
    templates: [
      {
        type: 'Reward',
        title: 'Reward Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Non-Reward',
        title: 'Non-Reward Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
      }
    ]
  }
];

// 类型映射到小标题
export const Type2Title = new Map([
  [TitleEnum.APPROVAL, 'Approval Notification'],
  [TitleEnum.DECLINE, 'Decline Notification'],
  [TitleEnum.WAITLIST, 'Waitlist Notification'],
  [TitleEnum.SUBMIT, 'Submission Notification'],
  [TitleEnum.DEADLINE, 'Deadline Notification'],
  [TitleEnum.START, 'Start Notification'],
  [TitleEnum.END, 'End Notification'],
  [TitleEnum.REWARD, 'Reward Notification'],
  [TitleEnum.NONREWARD, 'Non-Reward Notification'],
  [TitleEnum.SUCCESS, 'Application Success']
]);
