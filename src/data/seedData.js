// Seed data for machine inventory

const products = [
  { id: 'prod-1', name: 'E-Commerce Platform', subProducts: ['API', 'Workers', 'Database'] },
  { id: 'prod-2', name: 'Analytics Engine', subProducts: ['Ingestion', 'Processing', 'Storage'] },
  { id: 'prod-3', name: 'Mobile Backend', subProducts: ['Auth', 'Notifications', 'CDN'] },
  { id: 'prod-4', name: 'ML Platform', subProducts: ['Training', 'Inference', 'Data Pipeline'] },
  { id: 'prod-5', name: 'Internal Tools', subProducts: ['Admin', 'Monitoring'] },
];

const tagColors = {
  'gpu': '#7C3AED',
  'k8s-node': '#3B82F6',
  'loaner': '#F59E0B',
  'shared': '#F97316',
  'database': '#10B981',
  'cache': '#06B6D4',
  'special': '#EC4899',
  'legacy': '#6B7280',
  'high-memory': '#8B5CF6',
  'ssd': '#14B8A6',
};

const machines = [
  // E-Commerce Platform - API
  { id: 'm-1', hostname: 'ecom-api-prod-01', type: 'vm', productId: 'prod-1', subProduct: 'API', environment: 'prod', owner: 'alice@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-2', hostname: 'ecom-api-prod-02', type: 'vm', productId: 'prod-1', subProduct: 'API', environment: 'prod', owner: 'alice@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-3', hostname: 'ecom-api-staging-01', type: 'vm', productId: 'prod-1', subProduct: 'API', environment: 'staging', owner: 'alice@company.com', status: 'active', tags: [] },
  
  // E-Commerce Platform - Workers
  { id: 'm-4', hostname: 'ecom-worker-prod-01', type: 'vm', productId: 'prod-1', subProduct: 'Workers', environment: 'prod', owner: 'alice@company.com', status: 'active', tags: ['k8s-node', 'high-memory'] },
  { id: 'm-5', hostname: 'ecom-worker-prod-02', type: 'vm', productId: 'prod-1', subProduct: 'Workers', environment: 'prod', owner: 'alice@company.com', status: 'active', tags: ['k8s-node'] },
  
  // E-Commerce Platform - Database
  { id: 'm-6', hostname: 'ecom-db-prod-01', type: 'physical', productId: 'prod-1', subProduct: 'Database', environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['database', 'ssd'] },
  { id: 'm-7', hostname: 'ecom-db-prod-02', type: 'physical', productId: 'prod-1', subProduct: 'Database', environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['database', 'ssd'] },
  { id: 'm-8', hostname: 'ecom-cache-prod-01', type: 'vm', productId: 'prod-1', subProduct: 'Database', environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['cache', 'high-memory'] },
  
  // Analytics Engine - Ingestion
  { id: 'm-9', hostname: 'analytics-ingest-prod-01', type: 'vm', productId: 'prod-2', subProduct: 'Ingestion', environment: 'prod', owner: 'charlie@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-10', hostname: 'analytics-ingest-prod-02', type: 'vm', productId: 'prod-2', subProduct: 'Ingestion', environment: 'prod', owner: 'charlie@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-11', hostname: 'analytics-ingest-staging-01', type: 'vm', productId: 'prod-2', subProduct: 'Ingestion', environment: 'staging', owner: 'charlie@company.com', status: 'active', tags: [] },
  
  // Analytics Engine - Processing
  { id: 'm-12', hostname: 'analytics-proc-prod-01', type: 'cloud', productId: 'prod-2', subProduct: 'Processing', environment: 'prod', owner: 'charlie@company.com', status: 'active', tags: ['high-memory'] },
  { id: 'm-13', hostname: 'analytics-proc-prod-02', type: 'cloud', productId: 'prod-2', subProduct: 'Processing', environment: 'prod', owner: 'charlie@company.com', status: 'active', tags: ['high-memory'] },
  { id: 'm-14', hostname: 'analytics-proc-prod-03', type: 'cloud', productId: 'prod-2', subProduct: 'Processing', environment: 'prod', owner: 'charlie@company.com', status: 'active', tags: [] },
  
  // Analytics Engine - Storage
  { id: 'm-15', hostname: 'analytics-storage-prod-01', type: 'physical', productId: 'prod-2', subProduct: 'Storage', environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['database', 'ssd'] },
  { id: 'm-16', hostname: 'analytics-storage-prod-02', type: 'physical', productId: 'prod-2', subProduct: 'Storage', environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['database'] },
  
  // Mobile Backend - Auth
  { id: 'm-17', hostname: 'mobile-auth-prod-01', type: 'vm', productId: 'prod-3', subProduct: 'Auth', environment: 'prod', owner: 'diana@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-18', hostname: 'mobile-auth-prod-02', type: 'vm', productId: 'prod-3', subProduct: 'Auth', environment: 'prod', owner: 'diana@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-19', hostname: 'mobile-auth-staging-01', type: 'vm', productId: 'prod-3', subProduct: 'Auth', environment: 'staging', owner: 'diana@company.com', status: 'active', tags: [] },
  
  // Mobile Backend - Notifications
  { id: 'm-20', hostname: 'mobile-notif-prod-01', type: 'vm', productId: 'prod-3', subProduct: 'Notifications', environment: 'prod', owner: 'diana@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-21', hostname: 'mobile-notif-dev-01', type: 'vm', productId: 'prod-3', subProduct: 'Notifications', environment: 'dev', owner: 'diana@company.com', status: 'active', tags: [] },
  
  // Mobile Backend - CDN
  { id: 'm-22', hostname: 'mobile-cdn-prod-01', type: 'cloud', productId: 'prod-3', subProduct: 'CDN', environment: 'prod', owner: 'diana@company.com', status: 'active', tags: ['cache'] },
  { id: 'm-23', hostname: 'mobile-cdn-prod-02', type: 'cloud', productId: 'prod-3', subProduct: 'CDN', environment: 'prod', owner: 'diana@company.com', status: 'active', tags: ['cache'] },
  
  // ML Platform - Training
  { id: 'm-24', hostname: 'ml-train-prod-01', type: 'physical', productId: 'prod-4', subProduct: 'Training', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['gpu', 'high-memory'] },
  { id: 'm-25', hostname: 'ml-train-prod-02', type: 'physical', productId: 'prod-4', subProduct: 'Training', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['gpu', 'high-memory'] },
  { id: 'm-26', hostname: 'ml-train-dev-01', type: 'physical', productId: 'prod-4', subProduct: 'Training', environment: 'dev', owner: 'eve@company.com', status: 'active', tags: ['gpu', 'loaner'] },
  
  // ML Platform - Inference
  { id: 'm-27', hostname: 'ml-infer-prod-01', type: 'vm', productId: 'prod-4', subProduct: 'Inference', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-28', hostname: 'ml-infer-prod-02', type: 'vm', productId: 'prod-4', subProduct: 'Inference', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['k8s-node'] },
  { id: 'm-29', hostname: 'ml-infer-staging-01', type: 'vm', productId: 'prod-4', subProduct: 'Inference', environment: 'staging', owner: 'eve@company.com', status: 'active', tags: [] },
  
  // ML Platform - Data Pipeline
  { id: 'm-30', hostname: 'ml-pipeline-prod-01', type: 'vm', productId: 'prod-4', subProduct: 'Data Pipeline', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['k8s-node', 'high-memory'] },
  { id: 'm-31', hostname: 'ml-pipeline-prod-02', type: 'vm', productId: 'prod-4', subProduct: 'Data Pipeline', environment: 'prod', owner: 'eve@company.com', status: 'active', tags: ['k8s-node'] },
  
  // Internal Tools - Admin
  { id: 'm-32', hostname: 'admin-prod-01', type: 'vm', productId: 'prod-5', subProduct: 'Admin', environment: 'prod', owner: 'frank@company.com', status: 'active', tags: [] },
  { id: 'm-33', hostname: 'admin-staging-01', type: 'vm', productId: 'prod-5', subProduct: 'Admin', environment: 'staging', owner: 'frank@company.com', status: 'active', tags: [] },
  
  // Internal Tools - Monitoring
  { id: 'm-34', hostname: 'monitoring-prod-01', type: 'vm', productId: 'prod-5', subProduct: 'Monitoring', environment: 'prod', owner: 'frank@company.com', status: 'active', tags: ['shared'] },
  { id: 'm-35', hostname: 'monitoring-prod-02', type: 'vm', productId: 'prod-5', subProduct: 'Monitoring', environment: 'prod', owner: 'frank@company.com', status: 'active', tags: ['shared'] },
  
  // Unassigned machines
  { id: 'm-36', hostname: 'legacy-app-01', type: 'physical', productId: null, subProduct: null, environment: 'prod', owner: 'bob@company.com', status: 'idle', tags: ['legacy'] },
  { id: 'm-37', hostname: 'test-machine-99', type: 'vm', productId: null, subProduct: null, environment: 'test', owner: null, status: 'active', tags: [] },
  { id: 'm-38', hostname: 'loaner-gpu-01', type: 'physical', productId: null, subProduct: null, environment: 'dev', owner: 'eve@company.com', status: 'active', tags: ['gpu', 'loaner'] },
  { id: 'm-39', hostname: 'temp-build-server', type: 'vm', productId: null, subProduct: null, environment: 'dev', owner: null, status: 'idle', tags: [] },
  { id: 'm-40', hostname: 'decom-old-api-01', type: 'vm', productId: null, subProduct: null, environment: 'prod', owner: 'alice@company.com', status: 'decommissioned', tags: ['legacy'] },
  
  // Additional machines for density
  { id: 'm-41', hostname: 'ecom-api-dev-01', type: 'vm', productId: 'prod-1', subProduct: 'API', environment: 'dev', owner: 'alice@company.com', status: 'active', tags: [] },
  { id: 'm-42', hostname: 'ecom-worker-staging-01', type: 'vm', productId: 'prod-1', subProduct: 'Workers', environment: 'staging', owner: 'alice@company.com', status: 'active', tags: [] },
  { id: 'm-43', hostname: 'analytics-proc-dev-01', type: 'cloud', productId: 'prod-2', subProduct: 'Processing', environment: 'dev', owner: 'charlie@company.com', status: 'active', tags: [] },
  { id: 'm-44', hostname: 'mobile-auth-dev-01', type: 'vm', productId: 'prod-3', subProduct: 'Auth', environment: 'dev', owner: 'diana@company.com', status: 'active', tags: [] },
  { id: 'm-45', hostname: 'ml-train-staging-01', type: 'physical', productId: 'prod-4', subProduct: 'Training', environment: 'staging', owner: 'eve@company.com', status: 'active', tags: ['gpu'] },
  { id: 'm-46', hostname: 'shared-jenkins-01', type: 'vm', productId: null, subProduct: null, environment: 'prod', owner: 'frank@company.com', status: 'active', tags: ['shared', 'special'] },
  { id: 'm-47', hostname: 'shared-jenkins-02', type: 'vm', productId: null, subProduct: null, environment: 'prod', owner: 'frank@company.com', status: 'active', tags: ['shared', 'special'] },
  { id: 'm-48', hostname: 'backup-storage-01', type: 'physical', productId: null, subProduct: null, environment: 'prod', owner: 'bob@company.com', status: 'active', tags: ['database'] },
  { id: 'm-49', hostname: 'ecom-db-staging-01', type: 'vm', productId: 'prod-1', subProduct: 'Database', environment: 'staging', owner: 'bob@company.com', status: 'active', tags: ['database'] },
  { id: 'm-50', hostname: 'analytics-storage-staging-01', type: 'physical', productId: 'prod-2', subProduct: 'Storage', environment: 'staging', owner: 'bob@company.com', status: 'active', tags: ['database'] },
];

export { products, machines, tagColors };
