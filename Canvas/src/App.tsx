import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from 'reactflow';
import { TopBar } from './components/TopBar';
import { LeftRail } from './components/LeftRail';
import { FlowCanvas } from './components/FlowCanvas';
import { RightPanel } from './components/RightPanel';
import { MobilePanel } from './components/MobilePanel';
import { useAppStore } from './store';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <div className="h-screen flex flex-col">
          <TopBar />
          <div className="flex-1 flex">
            <LeftRail />
            <FlowCanvas />
            <div className="hidden md:block">
              <RightPanel />
            </div>
          </div>
          <MobilePanel />
        </div>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}

export default App;
