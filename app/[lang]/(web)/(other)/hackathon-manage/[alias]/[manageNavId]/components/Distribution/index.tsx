'use client';
import React, { useState } from 'react';
import Sources from './Sources';
import Growth from './Growth';
import Various from './Various';
import SourceModal from './SourceModal';

interface DistributionProp {}

const Distribution: React.FC<DistributionProp> = () => {
  const [open, setOpen] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col gap-[40px]">
      <Sources />
      <Growth />
      <Various />
      <SourceModal
        open={open}
        onClose={() => setOpen(false)}
        handleDelete={() => setDeleteOpen(true)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Distribution;
