import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaGithub, FaAws } from 'react-icons/fa';
import { SiPostgresql, SiRedis, SiMongodb, SiTerraform } from 'react-icons/si';
import { Badge } from '@/components/ui/badge';

const DockerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="8" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    <rect x="6" y="8" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    <rect x="10" y="8" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    <rect x="6" y="5" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    <rect x="10" y="5" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    <rect x="14" y="8" width="3" height="3" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
  </svg>
);

const AwsLogo = () => (
  <FaAws className="text-[#FF9900]" size={20} />
);

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'github': return <FaGithub className="w-4 h-4 text-gray-700 dark:text-gray-300" />;
    case 'postgres': return <SiPostgresql className="w-4 h-4 text-blue-600" />;
    case 'redis': return <SiRedis className="w-4 h-4 text-red-600" />;
    case 'mongodb': return <SiMongodb className="w-4 h-4 text-green-600" />;
    case 'docker': return <div className="text-blue-500"><DockerIcon /></div>;
    case 'terraform': return <SiTerraform className="w-4 h-4 text-purple-600" />;
    default: return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Healthy': return 'border-green-500';
    case 'Degraded': return 'border-yellow-500';
    case 'Down': return 'border-red-500';
    default: return 'border-gray-500';
  }
};

export function CustomNode({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState('CPU');
  const [sliderValue, setSliderValue] = useState(data.sliderValue || 65);
  const tabs = ['CPU', 'Memory', 'Disk', 'Region'];

  return (
    <div className={`px-3 py-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-2 ${getStatusColor(data.status)} min-w-[220px] max-w-[240px]`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      
      <div className="flex items-center gap-2 mb-2">
        {getNodeIcon(data.type)}
        <div className="text-gray-900 dark:text-white font-medium text-xs truncate">{data.label}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 mb-3 text-center">
        <div className="text-sm font-bold text-gray-900 dark:text-white">0.02</div>
        <div className="text-sm font-bold text-gray-900 dark:text-white">0.05</div>
        <div className="text-sm font-bold text-gray-900 dark:text-white">10.0</div>
        <div className="text-sm font-bold text-gray-900 dark:text-white">1</div>
      </div>

      <div className="flex space-x-1 mb-3 bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <div className="relative mb-1">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md border border-gray-300"
            style={{ left: `${sliderValue}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="number"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-12 h-5 text-xs ml-auto bg-transparent border border-gray-300 dark:border-gray-600 rounded px-1"
          min="0"
          max="100"
        />
      </div>

      <div className="flex items-center justify-between">
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
          Success
        </Badge>
        <AwsLogo />
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}
