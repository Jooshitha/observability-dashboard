import { AppSelector } from './AppSelector';
import { NodeInspector } from './NodeInspector';
import { useSelectedNodeId } from '@/store';

export function RightPanel() {
  const selectedNodeId = useSelectedNodeId();

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <AppSelector />
      {selectedNodeId && <NodeInspector />}
    </div>
  );
}
