import dayjs from '@/components/Common/Dayjs';
import { AnnouncementEvent, HackathonAnnouncementType, TimelineStatus } from './constants';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';

const getTimelineStatus = (startTimeUtc: string, endTimeUtc: string) => {
  if (!startTimeUtc || !endTimeUtc) {
    return TimelineStatus.END;
  }
  const currentTimeZone = dayjs.tz.guess();
  const starTime = dayjs.utc(startTimeUtc).tz(currentTimeZone);
  const endTime = dayjs.utc(endTimeUtc).tz(currentTimeZone);
  const currentTime = dayjs().tz(currentTimeZone);
  const isBetween = currentTime.isBetween(starTime, endTime);

  if (isBetween) {
    return TimelineStatus.ACTIVE;
  }

  const isBefore = currentTime.isBefore(starTime);

  if (isBefore) {
    return TimelineStatus.UPCOMING;
  }

  return TimelineStatus.END;
};

const getRewardTimeStatus = (startTimeUtc: string) => {
  if (!startTimeUtc) {
    return TimelineStatus.END;
  }

  const currentTimeZone = dayjs.tz.guess();
  const starTime = dayjs.utc(startTimeUtc).tz(currentTimeZone);
  const currentTime = dayjs().tz(currentTimeZone);

  const isBefore = currentTime.isBefore(starTime);

  if (isBefore) {
    return TimelineStatus.UPCOMING;
  }

  return TimelineStatus.END;
};

const reTemplate = {
  type: AnnouncementEvent.Registration,
  title: AnnouncementEvent.Registration,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
    getTimelineStatus(timeline?.registrationOpen, timeline?.registrationClose),
  templates: [
    {
      type: 'Approval',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.registrationOpen, timeline?.registrationClose)
    },
    {
      type: 'Decline',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.registrationOpen, timeline?.registrationClose)
    },
    {
      type: 'Waitlist',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.registrationOpen, timeline?.registrationClose)
    }
  ]
};

const reSucTemplate = {
  type: AnnouncementEvent.Registration,
  title: AnnouncementEvent.Registration,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
  templates: [
    {
      type: 'Success',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
    }
  ]
};

const subTemplate = {
  type: AnnouncementEvent.Submission,
  title: AnnouncementEvent.Submission,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
    getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose),
  templates: [
    {
      type: 'Deadline',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose)
    },
    {
      type: 'Submit',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose)
    }
  ]
};

const subStartTemplate = {
  type: AnnouncementEvent.Submission,
  title: AnnouncementEvent.Submission,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
    getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose),
  templates: [
    {
      type: 'Start',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose)
    },
    {
      type: 'Deadline',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose)
    },
    {
      type: 'Submit',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionOpen, timeline?.submissionClose)
    }
  ]
};

const votingTemplate = {
  type: AnnouncementEvent.Voting,
  title: AnnouncementEvent.Voting,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
    getTimelineStatus(timeline?.submissionClose, timeline?.rewardTime),
  templates: [
    {
      type: 'Start',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionClose, timeline?.rewardTime)
    },
    {
      type: 'End',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) =>
        getTimelineStatus(timeline?.submissionClose, timeline?.rewardTime)
    }
  ]
};

const rewardTemplate = {
  type: AnnouncementEvent.Reward,
  title: AnnouncementEvent.Reward,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => getRewardTimeStatus(timeline?.rewardTime),
  templates: [
    {
      type: 'Reward',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => getRewardTimeStatus(timeline?.rewardTime)
    },
    {
      type: 'Non-Reward',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => getRewardTimeStatus(timeline?.rewardTime)
    }
  ]
};

const judgingTemplate = {
  type: AnnouncementEvent.Judging,
  title: AnnouncementEvent.Judging,
  timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.UPCOMING,
  templates: [
    {
      type: 'Start',
      timelineStatus: (timeline: SimpleHackathonInfo['timeline']) => TimelineStatus.ACTIVE
    }
  ]
};

const useAnnouncementsEvent = (hackathonAnnouncementType: HackathonAnnouncementType) => {
  const announcementsEvent = [];

  switch (hackathonAnnouncementType) {
    case HackathonAnnouncementType.HYBRID_HACKQUEST:
      announcementsEvent.push(reTemplate, subTemplate, votingTemplate, rewardTemplate);
      break;
    case HackathonAnnouncementType.HYBRID_NO_HACKQUEST:
      announcementsEvent.push(reTemplate, subTemplate, judgingTemplate, rewardTemplate);
      break;
    case HackathonAnnouncementType.ONLINE_HACKQUEST:
      announcementsEvent.push(reSucTemplate, subTemplate, votingTemplate, rewardTemplate);
      break;
    case HackathonAnnouncementType.ONLINE_NO_HACKQUEST:
      announcementsEvent.push(reSucTemplate, subStartTemplate, judgingTemplate, rewardTemplate);
      break;
  }

  return {
    announcementsEvent
  };
};

export default useAnnouncementsEvent;
