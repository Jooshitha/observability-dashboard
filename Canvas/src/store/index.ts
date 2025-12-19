import { create } from 'zustand';
import type { InspectorTab } from '@/types';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  isDarkMode: boolean;
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'Config',
  isDarkMode: false,
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export const useSelectedAppId = () => useAppStore((state) => state.selectedAppId);
export const useSelectedNodeId = () => useAppStore((state) => state.selectedNodeId);
export const useIsMobilePanelOpen = () => useAppStore((state) => state.isMobilePanelOpen);
export const useActiveInspectorTab = () => useAppStore((state) => state.activeInspectorTab);
