import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const AwsLogo = () => (
  <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
    <path d="M8.5 6.5c0 .8-.1 1.4-.4 2-.3.5-.7.8-1.3.8s-1-.3-1.3-.8c-.3-.6-.4-1.2-.4-2s.1-1.4.4-2c.3-.5.7-.8 1.3-.8s1 .3 1.3.8c.3.6.4 1.2.4 2zm-1.8-3.2c-.9 0-1.6.3-2.1 1-.5.7-.8 1.6-.8 2.7s.3 2 .8 2.7c.5.7 1.2 1 2.1 1s1.6-.3 2.1-1c.5-.7.8-1.6.8-2.7s-.3-2-.8-2.7c-.5-.7-1.2-1-2.1-1z" fill="#FF9900"/>
    <path d="M15.2 6.5c0 .8-.1 1.4-.4 2-.3.5-.7.8-1.3.8s-1-.3-1.3-.8c-.3-.6-.4-1.2-.4-2s.1-1.4.4-2c.3-.5.7-.8 1.3-.8s1 .3 1.3.8c.3.6.4 1.2.4 2zm-1.8-3.2c-.9 0-1.6.3-2.1 1-.5.7-.8 1.6-.8 2.7s.3 2 .8 2.7c.5.7 1.2 1 2.1 1s1.6-.3 2.1-1c.5-.7.8-1.6.8-2.7s-.3-2-.8-2.7c-.5-.7-1.2-1-2.1-1z" fill="#FF9900"/>
    <path d="M21.8 3.5h-1.3v6.3h1.3v-.8c.4.6 1 .9 1.8.9.8 0 1.4-.3 1.9-1 .5-.7.7-1.6.7-2.7s-.2-2-.7-2.7c-.5-.7-1.1-1-1.9-1-.8 0-1.4.3-1.8.9v-.9zm0 3.1c0-.8.1-1.4.4-1.8.3-.4.7-.6 1.2-.6s.9.2 1.2.6c.3.4.4 1 .4 1.8s-.1 1.4-.4 1.8c-.3.4-.7.6-1.2.6s-.9-.2-1.2-.6c-.3-.4-.4-1-.4-1.8z" fill="#FF9900"/>
  </svg>
);

export function StatsCard() {
  const [activeTab, setActiveTab] = useState('CPU');
  const [sliderValue, setSliderValue] = useState(65);

  const tabs = ['CPU', 'Memory', 'Disk', 'Region'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">0.02</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">0.05 GB</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">10.00 GB</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
        </div>
      </div>

      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="relative mb-4">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-gray-300"
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
        <Input
          type="number"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-20 ml-auto"
          min="0"
          max="100"
        />
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Success
        </Badge>
        <AwsLogo />
      </div>
    </div>
  );
}
