'use client';
import { FC } from 'react';
import { AnnouncementsEvent, HackathonAnnouncementType, PhaseEnum, TimelineStatus } from './constants';
import { cn } from '@/helper/utils';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import AnnouncementEditAndViewModal from './AnnouncementEditAndViewModal';
import useAnnouncementsEvent from './useAnnouncementsEvent';
import { camelCase } from 'lodash';

interface EventBaseProps {}

const EventBase: FC<EventBaseProps> = (props) => {
  const hackathon = useHackathonManageStore((state) => state.hackathon);
  const { announcementsEvent } = useAnnouncementsEvent(HackathonAnnouncementType.HYBRID_HACKQUEST);

  const computedPhase = (announcementsEvent: typeof AnnouncementsEvent, timeline: SimpleHackathonInfo['timeline']) => {
    //REGISTRATION&SUBMISSION阶段
    if (announcementsEvent[1].timelineStatus(timeline) !== TimelineStatus.END) {
      return PhaseEnum.REGISTRATION_SUBMISSION;
    }

    // VOTING阶段
    if (announcementsEvent[2].timelineStatus(timeline) !== TimelineStatus.END) {
      return PhaseEnum.VOTING;
    }

    // BEFORE_WINNER阶段
    if (announcementsEvent[3].timelineStatus(timeline) !== TimelineStatus.END) {
      return PhaseEnum.BEFORE_WINNER;
    }

    return PhaseEnum.AFTER_WINNER;
  };

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-h5 text-neutral-off-black">Event-Based Announcements</h5>
      <p className="body-m text-neutral-rich-gray">
        Event-based announcements are triggered by key events or milestones within the hackathon and ensure that users
        are kept informed about important updates.
      </p>
      <div className="flex w-full justify-between gap-4">
        {announcementsEvent.map((event, index) => {
          const eventTimelineStatus = event.timelineStatus(hackathon.timeline);
          return (
            <div
              className={cn('flex flex-1 flex-col gap-5 rounded-2xl border  p-5', {
                'border-neutral-medium-gray bg-neutral-white': eventTimelineStatus !== TimelineStatus.END,
                'border-neutral-light-gray bg-neutral-off-white': eventTimelineStatus === TimelineStatus.END
              })}
              key={event.type + index}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block h-[1.8125rem] w-[.1875rem] rounded-full bg-yellow-dark"></span>
                <span className="body-l-bold text-neutral-off-black">{event.title}</span>
              </div>
              <div className="flex min-h-[6.6725rem] flex-col gap-3">
                {event.templates.map((item, index) => {
                  const itemTimelineStatus = item.timelineStatus(hackathon.timeline);
                  return (
                    <div className="flex justify-between" key={item.type + index}>
                      <span className="body-m text-neutral-medium-gray">{item.type}</span>
                      <span
                        className={cn(
                          'caption-12pt flex w-20 items-center justify-center rounded border py-1 text-neutral-rich-gray',
                          {
                            'border-yellow-dark bg-yellow-extra-light': itemTimelineStatus === TimelineStatus.ACTIVE,
                            'border-neutral-medium-gray bg-neutral-white':
                              itemTimelineStatus === TimelineStatus.UPCOMING,
                            'border-neutral-light-gray bg-neutral-light-gray': itemTimelineStatus === TimelineStatus.END
                          }
                        )}
                      >
                        {itemTimelineStatus}
                      </span>
                    </div>
                  );
                })}
              </div>

              {eventTimelineStatus === TimelineStatus.END && (
                // <Button ghost className="button-text-s h-[2.125rem]" block>
                //   view details
                // </Button>
                <AnnouncementEditAndViewModal
                  title={event.title}
                  queryParams={JSON.stringify(event.templates.map((item) => camelCase(item.type).toUpperCase()))}
                  itemTimelineStatus={eventTimelineStatus}
                  phase={computedPhase(AnnouncementsEvent, hackathon.timeline)}
                  disable={true}
                  isEdit={false}
                />
              )}
              {eventTimelineStatus !== TimelineStatus.END && (
                // <Button className="button-text-s h-[2.125rem]" block>
                //   edit
                // </Button>
                <AnnouncementEditAndViewModal
                  title={event.title}
                  queryParams={JSON.stringify(event.templates.map((item) => camelCase(item.type).toUpperCase()))}
                  itemTimelineStatus={eventTimelineStatus}
                  phase={computedPhase(AnnouncementsEvent, hackathon.timeline)}
                  disable={true}
                  isEdit={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventBase;
