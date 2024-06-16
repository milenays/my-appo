"use client";

import { useState, useEffect } from "react";
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400">Welcome to your dashboard, {user.name}!</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Quick Stats</h2>
        <div className="mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-700 dark:text-gray-300">Total Orders: 120</p>
            <p className="text-gray-700 dark:text-gray-300">Pending Orders: 15</p>
            <p className="text-gray-700 dark:text-gray-300">Completed Orders: 105</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
