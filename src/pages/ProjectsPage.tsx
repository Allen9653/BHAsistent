import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { PageSeo } from '../components/PageSeo';

interface ProjectsPageProps {
  onOpenBojanka: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenBojanka }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[70vh]">
      <PageSeo />
      <ProjectsSection onOpenBojanka={onOpenBojanka} />
    </div>
  );
};

export default ProjectsPage;
