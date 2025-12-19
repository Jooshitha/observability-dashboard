import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Moon, Sun, Share2, User, Search } from 'lucide-react';
import { useAppStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '@/api/mock';
import { useState, useRef, useEffect } from 'react';

export function TopBar() {
  const { isMobilePanelOpen, setIsMobilePanelOpen, isDarkMode, toggleTheme, setSelectedAppId } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: apps } = useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  });

  const filteredApps = apps?.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Service Graph</h1>
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowResults(true)}
              className="pl-10 w-64"
            />
          </div>
          {showResults && filteredApps.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppSelect(app.id)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md"
                >
                  {app.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
