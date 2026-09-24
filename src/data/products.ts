export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 59.99,
    inStock: true,
    description:
      'Over-ear wireless headphones with active noise cancellation and 30-hour battery life.',
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Wearables',
    price: 129.0,
    inStock: true,
    description:
      'Track fitness, heart rate and sleep. Water resistant with a bright AMOLED display.',
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    category: 'Audio',
    price: 39.5,
    inStock: false,
    description:
      'Portable speaker with deep bass, 12-hour playtime and splash-proof design.',
  },
  {
    id: '4',
    name: 'USB-C Charger',
    category: 'Accessories',
    price: 19.99,
    inStock: true,
    description: '30W fast charger compatible with phones, tablets and laptops.',
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    category: 'Computers',
    price: 89.0,
    inStock: true,
    description:
      'Compact 75% layout with hot-swappable switches and RGB backlighting.',
  },
  {
    id: '6',
    name: 'Gaming Mouse',
    category: 'Computers',
    price: 45.75,
    inStock: false,
    description:
      'Lightweight ergonomic mouse with a 16K DPI sensor and programmable buttons.',
  },
];
