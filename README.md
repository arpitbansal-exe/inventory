# Machine Inventory Management System

A visual, board-style machine inventory management tool for DevOps teams.

## Features

✅ **Visual Board Layout** - Kanban-style view of all machines
✅ **Multiple Views** - Group by Product, Environment, or Owner
✅ **Drag & Drop** - Move machines between products/groups
✅ **Smart Filtering** - Filter by environment, owner, tags, or issues
✅ **Color-Coded Tags** - Instantly identify machine characteristics
✅ **Issue Detection** - Automatic highlighting of problematic machines

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd machine-inventory
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Usage

### Views

**By Product** (Default)
- Columns represent products
- Sub-sections show sub-products (API, Workers, etc.)
- Unassigned machines appear in their own column

**By Environment**
- Columns represent environments (prod, staging, dev, test)
- All machines grouped by environment

**By Owner**
- Columns represent machine owners
- Unassigned machines appear in "No Owner" column

### Filtering

**Environment Filter**
- Click environment badges to filter machines
- Multiple environments can be selected

**Owner Filter**
- Use dropdown to select owners
- Multiple owners can be selected

**Tags Filter**
- Click on any tag in a machine card to filter by that tag
- Tags appear in the filter bar

**Issues Filter**
- Click "Issues Only" to show only problematic machines
- Issues include:
  - Machines with no product assigned
  - Loaner machines in production
  - Idle or decommissioned machines

### Drag and Drop

1. Click and hold any machine card
2. Drag to a different column or group
3. Release to reassign the machine
4. Changes happen instantly (optimistic updates)

### Machine Card Information

Each card shows:
- **Hostname** - Primary identifier
- **Type** - VM (🖥), Physical (⚙), or Cloud (☁)
- **Environment** - Color-coded badge
- **Owner** - Email username
- **Tags** - Color-coded labels
- **Warning Icon** - Appears if machine has issues

## Data Model

### Machine Fields (Core)
- `hostname` - Unique machine identifier
- `type` - vm | physical | cloud
- `product` - Which product owns this machine
- `subProduct` - Component within product
- `environment` - prod | staging | dev | test
- `owner` - Email of responsible person
- `status` - active | idle | decommissioned
- `tags` - Array of freeform tags

### Seed Data

The app comes with 50 sample machines across 5 products:
- E-Commerce Platform (12 machines)
- Analytics Engine (11 machines)
- Mobile Backend (7 machines)
- ML Platform (10 machines)
- Internal Tools (5 machines)
- Unassigned (5 machines)

## Next Steps

### Phase 2: Backend Integration

Replace the hardcoded seed data with a FastAPI backend:

1. PostgreSQL database
2. REST API endpoints
3. Real-time updates
4. Data persistence

### Phase 3: Advanced Features

- Machine edit modal (inline editing)
- CSV import/export
- Search functionality
- Audit log
- Custom field support

## Technology Stack

- **Frontend**: React 18 + Vite
- **State Management**: Zustand
- **Drag & Drop**: @hello-pangea/dnd (react-beautiful-dnd fork)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Project Structure

```
machine-inventory/
├── src/
│   ├── components/
│   │   ├── Board.jsx          # Main board layout
│   │   ├── ProductColumn.jsx  # Column component
│   │   ├── MachineGroup.jsx   # Sub-product groups
│   │   ├── MachineCard.jsx    # Individual machine card
│   │   ├── FilterBar.jsx      # Filtering controls
│   │   └── ViewSelector.jsx   # View switching
│   ├── data/
│   │   └── seedData.js        # Hardcoded machines
│   ├── store/
│   │   └── store.js           # Zustand state management
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Design Principles

1. **Visual First** - Board provides instant understanding at a glance
2. **Opinionated** - Fixed core fields, flexible tags for extension
3. **Fast Interactions** - Drag-and-drop, instant filtering
4. **Issue Awareness** - Automatic problem detection
5. **Simplicity** - No metrics, no monitoring, just inventory

## License

MIT
