import type { NextApiRequest, NextApiResponse } from 'next';

let brands = [
  { id: 1, name: 'Brand A' },
  { id: 2, name: 'Brand B' },
  // Diğer markalar
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(brands);
  } else if (req.method === 'POST') {
    const newBrand = req.body;
    newBrand.id = brands.length ? brands[brands.length - 1].id + 1 : 1;
    brands.push(newBrand);
    res.status(201).json(newBrand);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
