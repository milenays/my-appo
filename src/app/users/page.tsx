"use client";

import { useState, useEffect } from "react";
import Layout from '@/components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsersPage() {
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUserList(data));
  }, []);

  const handleAddUser = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUserList([...userList, addedUser]);
      setNewUser({ name: '', email: '' });
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUserList(userList.filter(user => user.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    const response = await fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingUser),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUserList(userList.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditingUser(null);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-gray-500 dark:text-gray-400">Manage your users.</p>
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{editingUser ? 'Edit User' : 'Add New User'}</h2>
          <div className="flex gap-4 mt-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={editingUser ? editingUser.name : newUser.name}
                onChange={(e) => editingUser ? setEditingUser({ ...editingUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editingUser ? editingUser.email : newUser.email}
                onChange={(e) => editingUser ? setEditingUser({ ...editingUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              {editingUser ? (
                <Button onClick={handleUpdateUser}>Update User</Button>
              ) : (
                <Button onClick={handleAddUser}>Add User</Button>
              )}
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
