import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AppSelector } from './AppSelector';
import { NodeInspector } from './NodeInspector';
import { useIsMobilePanelOpen, useSelectedNodeId, useAppStore } from '@/store';

export function MobilePanel() {
  const isMobilePanelOpen = useIsMobilePanelOpen();
  const selectedNodeId = useSelectedNodeId();
  const { setIsMobilePanelOpen } = useAppStore();

  return (
    <Sheet open={isMobilePanelOpen} onOpenChange={setIsMobilePanelOpen}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Service Graph</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <AppSelector />
          {selectedNodeId && <NodeInspector />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
