import { Product } from './products.model';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', sku: 'AUDIO-001', category: 'Electronics', price: 299.99, stock: 45, status: 'Active', image: '' },
  { id: '2', name: 'Mechanical Keyboard Pro', sku: 'COMP-042', category: 'Electronics', price: 149.50, stock: 8, status: 'Active', image: '' },
  { id: '3', name: 'Ergonomic Office Chair', sku: 'FURN-015', category: 'Home & Garden', price: 199.00, stock: 0, status: 'Archived', image: '' },
  { id: '4', name: 'USB-C Hub Multiport Adapter', sku: 'COMP-050', category: 'Accessories', price: 45.00, stock: 124, status: 'Active', image: '' },
  { id: '5', name: 'Cotton Minimalist T-Shirt', sku: 'APP-012', category: 'Apparel', price: 24.00, stock: 200, status: 'Active', image: '' },
  { id: '6', name: 'Smart Home Hub', sku: 'ELEC-993', category: 'Electronics', price: 129.99, stock: 23, status: 'Draft', image: '' },
  { id: '7', name: 'Leather Messenger Bag', sku: 'ACC-082', category: 'Accessories', price: 89.00, stock: 4, status: 'Active', image: '' },
  { id: '8', name: 'Desk Planter Set', sku: 'HOME-112', category: 'Home & Garden', price: 34.50, stock: 15, status: 'Draft', image: '' },
];
