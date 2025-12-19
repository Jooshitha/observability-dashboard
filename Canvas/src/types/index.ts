export interface App {
  id: string;
  name: string;
}

export interface GraphNode {
  id: string;
  name: string;
  description?: string;
  status: 'Healthy' | 'Degraded' | 'Down';
  sliderValue: number;
  type?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type InspectorTab = 'Config' | 'Runtime';
