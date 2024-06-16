import type { NextApiRequest, NextApiResponse } from 'next';

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Diğer kullanıcılar
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    users = users.filter(user => user.id !== parseInt(id as string));
    res.status(204).end();
  } else if (req.method === 'PUT') {
    const updatedUser = req.body;
    users = users.map(user => user.id === parseInt(id as string) ? updatedUser : user);
    res.status(200).json(updatedUser);
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
