'use client';

import * as React from 'react';
import { BasicInfo } from './basic-info';
import { About } from './about';
import { Attestation } from './attestation';
import { Course } from './course';
import { Project } from './project';
import { Hackathon } from './hackathon';

export default function Page() {
  return (
    <div className="min-h-screen w-full sm:bg-neutral-white">
      <BasicInfo />
      <div className="mx-auto max-w-5xl">
        <About />
        <Attestation />
        <Course />
        <Project />
        <Hackathon />
      </div>
    </div>
  );
}
