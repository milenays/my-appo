"use client";

import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Bu örnekte, kullanıcı bilgilerini yerel saklama alanından alıyoruz.
    // Gerçek bir uygulamada, kullanıcı bilgilerini bir API çağrısı ile alabilirsiniz.
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          User Profile
        </h2>
        <div className="space-y-4">
          <div>
            <strong>Name: </strong>{user.name}
          </div>
          <div>
            <strong>Email: </strong>{user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
