import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '@/api/mock';
import { useAppStore, useSelectedAppId } from '@/store';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function AppSelector() {
  const selectedAppId = useSelectedAppId();
  const { setSelectedAppId } = useAppStore();

  const { data: apps, isLoading, error } = useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  });

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load apps
      </div>
    );
  }

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-medium mb-3">Applications</h3>
      <div className="space-y-1">
        {apps?.map((app) => (
          <Button
            key={app.id}
            variant={selectedAppId === app.id ? 'default' : 'ghost'}
            className="w-full justify-start text-sm h-8"
            onClick={() => setSelectedAppId(app.id)}
          >
            {app.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
