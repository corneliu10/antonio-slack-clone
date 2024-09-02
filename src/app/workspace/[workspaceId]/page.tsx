'use client';

import { useWorkspaceId } from '@/hooks/use-workspace-id';

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();

  return <div>ID: {workspaceId}</div>;
};

export default WorkspaceIdPage;
