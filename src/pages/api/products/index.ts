import type { NextApiRequest, NextApiResponse } from 'next';

let products = [
  { id: 1, name: 'Product A', brand: 'Brand A', category: 'Category A', tax: 'Tax A', tag: 'Tag A' },
  { id: 2, name: 'Product B', brand: 'Brand B', category: 'Category B', tax: 'Tax B', tag: 'Tag B' },
  // Diğer ürünler
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const newProduct = req.body;
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
