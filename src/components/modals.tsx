'use client';

import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal';
import { useEffect, useState } from 'react';

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
