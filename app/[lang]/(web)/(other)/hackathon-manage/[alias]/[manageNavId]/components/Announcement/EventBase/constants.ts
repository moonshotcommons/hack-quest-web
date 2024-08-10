import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';

export enum AnnouncementEvent {
  Registration = 'Registration',
  Submission = 'Submission',
  Voting = 'Voting',
  Reward = 'Reward'
}

export enum TimelineStatus {
  ACTIVE = 'ACTIVE',
  UPCOMING = 'UPCOMING',
  END = 'END'
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
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Decline',
        title: 'Decline Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
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
    type: AnnouncementEvent.Registration,
    title: AnnouncementEvent.Registration,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE,
    templates: [
      {
        type: 'Approval',
        title: 'Approval Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Decline',
        title: 'Decline Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
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
    type: AnnouncementEvent.Registration,
    title: AnnouncementEvent.Registration,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
    templates: [
      {
        type: 'Approval',
        title: 'Approval Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Decline',
        title: 'Decline Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
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
    type: AnnouncementEvent.Registration,
    title: AnnouncementEvent.Registration,
    timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
    templates: [
      {
        type: 'Approval',
        title: 'Approval Notification',
        description: 'Message sent to applicants when their applications are approved*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
      },
      {
        type: 'Decline',
        title: 'Decline Notification',
        description: 'Message sent to applicants when their applications are declined*',
        template:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan leo nec sapien porttitor, a aliquet mi dictum. Fusce nec mauris ut dui tincidunt porttitor quis at eros. In elementum feugiat eros, id ullamcorper velit egestas vel. Proin eget bibendum libero. Etiam sed pretium ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING
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
  }
];
