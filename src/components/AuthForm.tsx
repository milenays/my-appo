"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/profile');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = activeTab === "login" ? "/api/login" : "/api/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      if (activeTab === "login") {
        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/profile');  // Yönlendirme profil sayfasına yapılıyor
      } else {
        alert('Registration successful. Please login.');
        setActiveTab('login');
      }
    } else {
      const result = await response.json();
      console.log(result);
      alert(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mb-4 flex justify-center">
            <img src="/uploads/stockie.png" alt="Logo" width={48} height={48} className="h-12 w-auto" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            {activeTab === "login" ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full justify-center">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required onChange={handleChange} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" required onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-center">
          <div className="text-sm">
            {activeTab === "login" ? (
              <span>
                Don't have an account?{" "}
                <Link
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => setActiveTab("register")}
                  prefetch={false}
                >
                  Register
                </Link>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <Link
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => setActiveTab("login")}
                  prefetch={false}
                >
                  Sign in
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
