import { useQuery } from '@tanstack/react-query';
import { fetchGraph } from '@/api/mock';
import { useSelectedAppId, useSelectedNodeId, useActiveInspectorTab, useAppStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState, useEffect } from 'react';

export function NodeInspector() {
  const selectedAppId = useSelectedAppId();
  const selectedNodeId = useSelectedNodeId();
  const activeTab = useActiveInspectorTab();
  const { setActiveInspectorTab } = useAppStore();

  const { data: graphData } = useQuery({
    queryKey: ['graph', selectedAppId],
    queryFn: () => fetchGraph(selectedAppId!),
    enabled: !!selectedAppId,
  });

  const selectedNode = graphData?.nodes.find(node => node.id === selectedNodeId);
  
  const [nodeName, setNodeName] = useState('');
  const [nodeDescription, setNodeDescription] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (selectedNode) {
      setNodeName(selectedNode.name);
      setNodeDescription(selectedNode.description || '');
      setSliderValue(selectedNode.sliderValue);
    }
  }, [selectedNode]);

  if (!selectedNodeId || !selectedNode) {
    return null;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Healthy': return 'success';
      case 'Degraded': return 'warning';
      case 'Down': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Node Inspector</h3>
        <Badge variant={getStatusVariant(selectedNode.status)}>
          {selectedNode.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveInspectorTab(value as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Config">Config</TabsTrigger>
          <TabsTrigger value="Runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="Config" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="node-name">Name</Label>
            <Input
              id="node-name"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="node-description">Description</Label>
            <Textarea
              id="node-description"
              value={nodeDescription}
              onChange={(e) => setNodeDescription(e.target.value)}
              placeholder="Optional description..."
            />
          </div>
        </TabsContent>

        <TabsContent value="Runtime" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Performance ({sliderValue}%)</Label>
              <Slider
                value={[sliderValue]}
                onValueChange={(value) => setSliderValue(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="performance-input">Performance Value</Label>
              <Input
                id="performance-input"
                type="number"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
