import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // JWT veya session yönetimi ekleyebilirsiniz
    // Örneğin, burada basit bir kullanıcı nesnesi döndürüyoruz
    res.status(200).json({ user: { name: user.name, email: user.email } });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
