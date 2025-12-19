import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { SiPostgresql, SiRedis, SiMongodb, SiTerraform } from 'react-icons/si';

const CustomServiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="2" rx="1" fill="#FCD34D" />
    <rect x="2" y="9" width="16" height="2" rx="1" fill="#FCD34D" />
    <rect x="2" y="14" width="16" height="2" rx="1" fill="#FCD34D" />
  </svg>
);

const DockerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="8" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
    <rect x="6" y="8" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
    <rect x="10" y="8" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
    <rect x="6" y="5" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
    <rect x="10" y="5" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
    <rect x="14" y="8" width="3" height="3" rx="0.5" fill="white" stroke="#0db7ed" strokeWidth="0.5"/>
  </svg>
);

export function LeftRail() {
  return (
    <div className="w-16 border-r bg-background flex flex-col items-center py-4 gap-2">
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <SiPostgresql className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <SiRedis className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <SiMongodb className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <DockerIcon />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <CustomServiceIcon />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <SiTerraform className="h-5 w-5" />
      </Button>
    </div>
  );
}
