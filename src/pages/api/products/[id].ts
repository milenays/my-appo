import type { NextApiRequest, NextApiResponse } from 'next';

let products = [
  { id: 1, name: 'Product A', brand: 'Brand A', category: 'Category A', tax: 'Tax A', tag: 'Tag A' },
  { id: 2, name: 'Product B', brand: 'Brand B', category: 'Category B', tax: 'Tax B', tag: 'Tag B' },
  // Diğer ürünler
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    products = products.filter(product => product.id !== parseInt(id as string));
    res.status(204).end();
  } else if (req.method === 'PUT') {
    const updatedProduct = req.body;
    products = products.map(product => product.id === parseInt(id as string) ? updatedProduct : product);
    res.status(200).json(updatedProduct);
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
