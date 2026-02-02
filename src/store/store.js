import { create } from 'zustand';
import { products, machines, tagColors } from '../data/seedData';

const useStore = create((set, get) => ({
  // Data
  products: products,
  machines: machines,
  tagColors: tagColors,
  
  // UI State
  selectedView: 'product', // 'product' | 'environment' | 'owner'
  filters: {
    products: [],
    environments: [],
    owners: [],
    tags: [],
    showIssuesOnly: false,
  },
  advancedFilters: [],
  
  // Actions
  setView: (view) => set({ selectedView: view }),
  
  setFilter: (filterType, values) => set((state) => ({
    filters: { ...state.filters, [filterType]: values }
  })),
  
  toggleIssuesFilter: () => set((state) => ({
    filters: { ...state.filters, showIssuesOnly: !state.filters.showIssuesOnly }
  })),
  
  clearFilters: () => set({
    filters: {
      products: [],
      environments: [],
      owners: [],
      tags: [],
      showIssuesOnly: false,
    },
    advancedFilters: [],
  }),
  
  // Set advanced filters (Grafana-style)
  setAdvancedFilters: (conditions) => set({ advancedFilters: conditions }),
  
  // Add new machine
  addMachine: (machineData) => set((state) => ({
    machines: [...state.machines, {
      id: `m-${Date.now()}`,
      ...machineData,
      tags: machineData.tags || []
    }]
  })),
  
  // Delete machine
  deleteMachine: (machineId) => set((state) => ({
    machines: state.machines.filter(m => m.id !== machineId)
  })),
  
  // Update machine
  updateMachine: (machineId, updates) => set((state) => ({
    machines: state.machines.map(m => 
      m.id === machineId ? { ...m, ...updates } : m
    )
  })),
  
  // Move machine to different product/subProduct
  moveMachine: (machineId, productId, subProduct) => set((state) => ({
    machines: state.machines.map(m =>
      m.id === machineId 
        ? { ...m, productId, subProduct }
        : m
    )
  })),
  
  // Add tag to machine
  addTagToMachine: (machineId, tag) => set((state) => ({
    machines: state.machines.map(m =>
      m.id === machineId && !m.tags.includes(tag)
        ? { ...m, tags: [...m.tags, tag] }
        : m
    )
  })),
  
  // Remove tag from machine
  removeTagFromMachine: (machineId, tag) => set((state) => ({
    machines: state.machines.map(m =>
      m.id === machineId
        ? { ...m, tags: m.tags.filter(t => t !== tag) }
        : m
    )
  })),
  
  // Computed: Get filtered machines
  getFilteredMachines: () => {
    const { machines, filters, advancedFilters } = get();
    
    let filtered = machines;
    
    // Apply advanced filters first
    if (advancedFilters && advancedFilters.length > 0) {
      filtered = filtered.filter(machine => {
        return advancedFilters.every(condition => {
          const fieldValue = machine[condition.field];
          const value = condition.value;
          
          // Skip if no value selected
          if (!value) return true;
          
          switch (condition.operator) {
            case 'equals':
              if (Array.isArray(fieldValue)) {
                return fieldValue.includes(value);
              }
              return String(fieldValue) === String(value);
              
            case 'contains':
              return String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
              
            case 'starts with':
              return String(fieldValue).toLowerCase().startsWith(String(value).toLowerCase());
              
            case 'ends with':
              return String(fieldValue).toLowerCase().endsWith(String(value).toLowerCase());
              
            case 'is any of':
              if (Array.isArray(fieldValue)) {
                return fieldValue.includes(value);
              }
              return String(fieldValue) === String(value);
              
            default:
              return true;
          }
        });
      });
    }
    
    // Filter by products
    if (filters.products.length > 0) {
      filtered = filtered.filter(m => 
        filters.products.includes(m.productId)
      );
    }
    
    // Filter by environments
    if (filters.environments.length > 0) {
      filtered = filtered.filter(m =>
        filters.environments.includes(m.environment)
      );
    }
    
    // Filter by owners
    if (filters.owners.length > 0) {
      filtered = filtered.filter(m =>
        filters.owners.includes(m.owner)
      );
    }
    
    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(m =>
        filters.tags.some(tag => m.tags.includes(tag))
      );
    }
    
    // Filter issues only
    if (filters.showIssuesOnly) {
      filtered = filtered.filter(m => {
        // Machine has issues if:
        // 1. No product assigned
        // 2. Has 'loaner' tag AND environment is 'prod'
        // 3. Status is 'decommissioned' or 'idle'
        return (
          !m.productId ||
          (m.tags.includes('loaner') && m.environment === 'prod') ||
          m.status === 'decommissioned' ||
          m.status === 'idle'
        );
      });
    }
    
    return filtered;
  },
  
  // Computed: Get unique values for filters
  getUniqueEnvironments: () => {
    const { machines } = get();
    return [...new Set(machines.map(m => m.environment))].sort();
  },
  
  getUniqueOwners: () => {
    const { machines } = get();
    return [...new Set(machines.map(m => m.owner).filter(Boolean))].sort();
  },
  
  getUniqueTags: () => {
    const { machines } = get();
    const allTags = machines.flatMap(m => m.tags);
    return [...new Set(allTags)].sort();
  },
  
  getUniqueStatuses: () => {
    const { machines } = get();
    return [...new Set(machines.map(m => m.status).filter(Boolean))].sort();
  },
  
  getUniqueSubProducts: () => {
    const { machines } = get();
    return [...new Set(machines.map(m => m.subProduct).filter(Boolean))].sort();
  },
}));

export default useStore;
