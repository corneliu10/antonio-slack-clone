interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default WorkspaceIdLayout;
