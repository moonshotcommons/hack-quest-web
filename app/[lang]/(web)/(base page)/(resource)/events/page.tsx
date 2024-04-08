import React from 'react';
import EventsBanner from './components/EventsBanner';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import ExploreMore from './components/ExploreMore';
import Reach from './components/Reach';
import LandingFooter from '@/components/Web/Business/LandingFooter';

interface EventsProp {}

const Events: React.FC<EventsProp> = () => {
  return (
    <div>
      <EventsBanner />
      <UpcomingEvents />
      <PastEvents />
      <ExploreMore />
      <Reach />
      <LandingFooter />
    </div>
  );
};

export default Events;
