import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from 'reactflow';
import { useQuery } from '@tanstack/react-query';
import { fetchGraph } from '@/api/mock';
import { useSelectedAppId, useAppStore } from '@/store';
import { CustomNode } from './CustomNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

export function FlowCanvas() {
  const selectedAppId = useSelectedAppId();
  const { setSelectedNodeId } = useAppStore();
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { data: graphData, isLoading } = useQuery({
    queryKey: ['graph', selectedAppId],
    queryFn: () => fetchGraph(selectedAppId!),
    enabled: !!selectedAppId,
  });

  useEffect(() => {
    if (graphData) {
      const flowNodes: Node[] = graphData.nodes.map((node, index) => ({
        id: node.id,
        type: 'custom',
        position: { 
          x: 100 + (index % 3) * 250, 
          y: 100 + Math.floor(index / 3) * 200 
        },
        data: { 
          label: node.name,
          ...node
        },
      }));

      const flowEdges: Edge[] = graphData.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'default',
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);

      setTimeout(() => fitView({ padding: 0.2, duration: 200 }), 100);
    }
  }, [graphData, setNodes, setEdges, fitView]);

  useEffect(() => {
    const handleResize = () => {
      if (nodes.length > 0) {
        fitView({ padding: 0.2, duration: 200 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [nodes, fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        setNodes((nds) => nds.filter((node) => !node.selected));
        setEdges((eds) => eds.filter((edge) => !edge.selected));
      }
    },
    [setNodes, setEdges]
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Loading graph...</div>
      </div>
    );
  }

  if (!selectedAppId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Select an application to view its graph</div>
      </div>
    );
  }

  return (
    <div className="flex-1" onKeyDown={onKeyDown} tabIndex={0}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={1.5}
        attributionPosition="bottom-left"
      >
        <Background variant={'dots' as any} gap={20} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
