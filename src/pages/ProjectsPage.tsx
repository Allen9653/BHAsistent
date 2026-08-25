import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';

interface ProjectsPageProps {
  onOpenBojanka: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenBojanka }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[70vh]">
      <ProjectsSection onOpenBojanka={onOpenBojanka} />
    </div>
  );
};

export default ProjectsPage;
