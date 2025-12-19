import type { App, GraphData } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockApps: App[] = [
  { id: 'github', name: 'GitHub Services' },
  { id: 'postgres', name: 'PostgreSQL Cluster' },
  { id: 'redis', name: 'Redis Cache' },
  { id: 'mongodb', name: 'MongoDB Database' },
  { id: 'docker', name: 'Docker Containers' },
  { id: 'terraform', name: 'Terraform Infrastructure' },
];

const mockGraphs: Record<string, GraphData> = {
  github: {
    nodes: [
      { id: 'node1', name: 'GitHub API', status: 'Healthy', sliderValue: 95, type: 'github' },
      { id: 'node2', name: 'Actions Runner', status: 'Healthy', sliderValue: 88, description: 'CI/CD pipeline runner', type: 'github' },
      { id: 'node3', name: 'Webhook Service', status: 'Degraded', sliderValue: 65, type: 'github' },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
    ],
  },
  postgres: {
    nodes: [
      { id: 'node4', name: 'Primary DB', status: 'Healthy', sliderValue: 92, type: 'postgres' },
      { id: 'node5', name: 'Read Replica', status: 'Healthy', sliderValue: 89, type: 'postgres' },
      { id: 'node6', name: 'Backup Service', status: 'Degraded', sliderValue: 45, description: 'Automated backup system', type: 'postgres' },
    ],
    edges: [
      { id: 'edge3', source: 'node4', target: 'node5' },
      { id: 'edge4', source: 'node4', target: 'node6' },
    ],
  },
  redis: {
    nodes: [
      { id: 'node7', name: 'Redis Master', status: 'Healthy', sliderValue: 96, type: 'redis' },
      { id: 'node8', name: 'Redis Slave', status: 'Healthy', sliderValue: 94, type: 'redis' },
      { id: 'node9', name: 'Redis Sentinel', status: 'Down', sliderValue: 0, type: 'redis' },
    ],
    edges: [
      { id: 'edge5', source: 'node7', target: 'node8' },
      { id: 'edge6', source: 'node7', target: 'node9' },
    ],
  },
  mongodb: {
    nodes: [
      { id: 'node10', name: 'MongoDB Primary', status: 'Healthy', sliderValue: 91, type: 'mongodb' },
      { id: 'node11', name: 'MongoDB Secondary', status: 'Healthy', sliderValue: 87, type: 'mongodb' },
      { id: 'node12', name: 'MongoDB Arbiter', status: 'Healthy', sliderValue: 99, type: 'mongodb' },
    ],
    edges: [
      { id: 'edge7', source: 'node10', target: 'node11' },
      { id: 'edge8', source: 'node10', target: 'node12' },
    ],
  },
  docker: {
    nodes: [
      { id: 'node13', name: 'Docker Registry', status: 'Healthy', sliderValue: 93, type: 'docker' },
      { id: 'node14', name: 'Container Runtime', status: 'Degraded', sliderValue: 72, type: 'docker' },
      { id: 'node15', name: 'Docker Swarm', status: 'Healthy', sliderValue: 85, type: 'docker' },
    ],
    edges: [
      { id: 'edge9', source: 'node13', target: 'node14' },
      { id: 'edge10', source: 'node14', target: 'node15' },
    ],
  },
  terraform: {
    nodes: [
      { id: 'node16', name: 'Terraform State', status: 'Healthy', sliderValue: 98, type: 'terraform' },
      { id: 'node17', name: 'Provider AWS', status: 'Healthy', sliderValue: 94, type: 'terraform' },
      { id: 'node18', name: 'Resource Manager', status: 'Degraded', sliderValue: 68, type: 'terraform' },
    ],
    edges: [
      { id: 'edge11', source: 'node16', target: 'node17' },
      { id: 'edge12', source: 'node17', target: 'node18' },
    ],
  },
};

export const fetchApps = async (): Promise<App[]> => {
  await delay(300);
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch apps');
  }
  return mockApps;
};

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  await delay(500);
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch graph');
  }
  return mockGraphs[appId] || { nodes: [], edges: [] };
};
