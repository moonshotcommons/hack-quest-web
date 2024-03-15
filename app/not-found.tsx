import React from 'react';
import { permanentRedirect } from 'next/navigation';

interface NotFoundProp {}

const NotFound: React.FC<NotFoundProp> = () => {
  permanentRedirect('/');
};

export default NotFound;
