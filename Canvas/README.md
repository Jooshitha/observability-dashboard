# React Flow Service Graph Application

A production-quality React + TypeScript application that displays service graphs with interactive node inspection capabilities.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Run linting:**
   ```bash
   npm run lint
   ```

6. **Type checking:**
   ```bash
   npm run typecheck
   ```

## Architecture Decisions

### State Management
- **Zustand**: Used for UI/app state management (selected app, selected node, mobile panel state, active inspector tab)
- **TanStack Query**: Handles server state, caching, and data fetching with loading/error states
- **ReactFlow**: Manages graph state internally with controlled updates

### Component Architecture
- **Modular Design**: Each component has a single responsibility
- **No Prop Drilling**: Zustand selectors used where appropriate
- **Clean Separation**: UI components separated from business logic

### Responsive Design
- **Desktop**: Fixed right panel (320px width)
- **Mobile**: Slide-over drawer using Radix UI Sheet component
- **Breakpoint**: `md` (768px) for responsive behavior

### Mock API Implementation
- **In-memory data**: No external dependencies
- **Artificial latency**: 300-500ms delays to simulate real API calls
- **Error simulation**: 10% random failure rate for testing error states
- **Data structure**: Normalized with separate apps and graphs

### Technology Stack
- **React 18** with TypeScript (strict mode)
- **Vite** for build tooling and development
- **ReactFlow** for graph visualization
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** for styling
- **Zustand** for client state
- **TanStack Query** for server state

## Features Implemented

### Layout
- ✅ Top bar with brand and mobile menu toggle
- ✅ Left rail with icon navigation (static)
- ✅ Center canvas with ReactFlow graph
- ✅ Right panel with app selector and node inspector
- ✅ Responsive mobile drawer

### ReactFlow Graph
- ✅ Minimum 3 nodes and 2 edges per app
- ✅ Draggable and selectable nodes
- ✅ Delete nodes with Delete/Backspace keys
- ✅ Dotted background pattern
- ✅ Pan, zoom, and fit view controls
- ✅ Node selection updates Zustand state
- ✅ Color-coded nodes based on status

### Node Inspector
- ✅ Status badge with color coding (Healthy/Degraded/Down)
- ✅ Tabbed interface (Config/Runtime)
- ✅ Synced slider and numeric input (0-100 range)
- ✅ Editable node name and description fields
- ✅ Active tab persisted in Zustand

### State Management
- ✅ Zustand store with selectors
- ✅ UI state only (no server data over-storage)
- ✅ Mobile panel state management
- ✅ Selected app/node tracking

### Data Fetching
- ✅ TanStack Query integration
- ✅ Loading and error states
- ✅ Automatic refetch on app change
- ✅ Response caching (5 minutes)

## Known Limitations

1. **Node Data Persistence**: Changes to node properties (name, description, slider value) are not persisted to the mock API - they reset when switching apps or refreshing.

2. **Graph Layout**: Uses simple grid-based positioning rather than automatic layout algorithms. For production, consider integrating layout libraries like dagre or elk.

3. **Real-time Updates**: No WebSocket or polling implementation for real-time status updates.

4. **Accessibility**: While shadcn/ui components are accessible, additional ARIA labels and keyboard navigation could be enhanced for the ReactFlow canvas.

5. **Error Boundaries**: No React error boundaries implemented for graceful error handling.

6. **Performance**: Large graphs (100+ nodes) may impact performance without virtualization.

## Engineering Assumptions

1. **Node Positioning**: Used simple grid layout since no specific layout requirements were provided.

2. **Status Colors**: Implemented standard traffic light colors (green/yellow/red) for node status visualization.

3. **Mobile Breakpoint**: Used Tailwind's `md` breakpoint (768px) as the responsive threshold.

4. **Tab Persistence**: Active inspector tab is persisted globally rather than per-node for simpler state management.

5. **Error Handling**: Implemented basic error states with retry capability through TanStack Query.

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with TypeScript compilation
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with React and TypeScript rules
- `npm run typecheck` - Run TypeScript compiler without emitting files
