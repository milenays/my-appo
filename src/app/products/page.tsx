"use client";

import { useState, useEffect } from "react";
import Layout from '@/components/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', brand: '', category: '', tax: '', tag: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductList(data));

    fetch('/api/brands')
      .then(response => response.json())
      .then(data => setBrands(data));

    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch('/api/taxes')
      .then(response => response.json())
      .then(data => setTaxes(data));

    fetch('/api/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  const handleAddProduct = async () => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      setProductList([...productList, addedProduct]);
      setNewProduct({ name: '', brand: '', category: '', tax: '', tag: '' });
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProductList(productList.filter(product => product.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    const response = await fetch(`/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingProduct),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProductList(productList.map(product => product.id === updatedProduct.id ? updatedProduct : product));
      setEditingProduct(null);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="text-gray-500 dark:text-gray-400">Manage your products.</p>
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="flex gap-4 mt-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select
                id="brand"
                value={editingProduct ? editingProduct.brand : newProduct.brand}
                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, brand: e.target.value }) : setNewProduct({ ...newProduct, brand: e.target.value })}
              >
                {brands.map(brand => <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>)}
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={editingProduct ? editingProduct.category : newProduct.category}
                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })}
              >
                {categories.map(category => <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>)}
              </Select>
            </div>
            <div>
              <Label htmlFor="tax">Tax</Label>
              <Select
                id="tax"
                value={editingProduct ? editingProduct.tax : newProduct.tax}
                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, tax: e.target.value }) : setNewProduct({ ...newProduct, tax: e.target.value })}
              >
                {taxes.map(tax => <SelectItem key={tax.id} value={tax.name}>{tax.name}</SelectItem>)}
              </Select>
            </div>
            <div>
              <Label htmlFor="tag">Tag</Label>
              <Select
                id="tag"
                value={editingProduct ? editingProduct.tag : newProduct.tag}
                onChange={(e) => editingProduct ? setEditingUser({ ...editingProduct, tag: e.target.value }) : setNewProduct({ ...newProduct, tag: e.target.value })}
              >
                {tags.map(tag => <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>)}
              </Select>
            </div>
            <div className="flex items-end">
              {editingProduct ? (
                <Button onClick={handleUpdateProduct}>Update Product</Button>
              ) : (
                <Button onClick={handleAddProduct}>Add Product</Button>
              )}
            </div>
          </div>
        </div>
        {productList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.tax}</TableCell>
                  <TableCell>{product.tag}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" color="red" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No Products Found</p>
        )}
      </div>
    </Layout>
  );
}
