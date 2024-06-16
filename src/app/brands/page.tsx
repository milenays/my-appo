"use client";

import { useState, useEffect } from "react";
import Layout from '@/components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrandsPage() {
  const [brandList, setBrandList] = useState([]);
  const [newBrand, setNewBrand] = useState({ name: '' });
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    fetch('/api/brands')
      .then(response => response.json())
      .then(data => setBrandList(data));
  }, []);

  const handleAddBrand = async () => {
    const response = await fetch('/api/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBrand),
    });

    if (response.ok) {
      const addedBrand = await response.json();
      setBrandList([...brandList, addedBrand]);
      setNewBrand({ name: '' });
    }
  };

  const handleDeleteBrand = async (id) => {
    const response = await fetch(`/api/brands/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBrandList(brandList.filter(brand => brand.id !== id));
    }
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
  };

  const handleUpdateBrand = async () => {
    const response = await fetch(`/api/brands/${editingBrand.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingBrand),
    });

    if (response.ok) {
      const updatedBrand = await response.json();
      setBrandList(brandList.map(brand => brand.id === updatedBrand.id ? updatedBrand : brand));
      setEditingBrand(null);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Brands</h1>
      <p className="text-gray-500 dark:text-gray-400">Manage your brands.</p>
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{editingBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
          <div className="flex gap-4 mt-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={editingBrand ? editingBrand.name : newBrand.name}
                onChange={(e) => editingBrand ? setEditingBrand({ ...editingBrand, name: e.target.value }) : setNewBrand({ ...newBrand, name: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              {editingBrand ? (
                <Button onClick={handleUpdateBrand}>Update Brand</Button>
              ) : (
                <Button onClick={handleAddBrand}>Add Brand</Button>
              )}
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandList.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditBrand(brand)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteBrand(brand.id)}>
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
