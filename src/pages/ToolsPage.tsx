import React from 'react';
import { DigitalToolsSection } from '../components/DigitalToolsSection';
import { useNavigate } from 'react-router-dom';

interface ToolsPageProps {
  onOpenBojanka: () => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ onOpenBojanka }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh]">
      <DigitalToolsSection
        onOpenContact={() => navigate('/kontakt')}
        onOpenBojanka={onOpenBojanka}
      />
    </div>
  );
};

export default ToolsPage;
