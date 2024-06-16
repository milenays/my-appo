"use client";

import { useState, useEffect } from "react";
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-gray-500 dark:text-gray-400">This is your profile page.</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">User Information</h2>
        <div className="mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}
