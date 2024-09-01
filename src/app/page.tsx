'use client';

import { UserButton } from '@/features/auth/components/user-button';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useEffect, useMemo } from 'react';

const HomePage = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log('Redirect to workspace');
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default HomePage;
