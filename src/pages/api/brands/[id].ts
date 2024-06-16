import type { NextApiRequest, NextApiResponse } from 'next';

let brands = [
  { id: 1, name: 'Brand A' },
  { id: 2, name: 'Brand B' },
  // Diğer markalar
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    brands = brands.filter(brand => brand.id !== parseInt(id as string));
    res.status(204).end();
  } else if (req.method === 'PUT') {
    const updatedBrand = req.body;
    brands = brands.map(brand => brand.id === parseInt(id as string) ? updatedBrand : brand);
    res.status(200).json(updatedBrand);
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
