"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { CategoryListing } from "@/components/category-listing";
import { ProductListing } from "@/components/product-listing";
import { CreateCategoryForm } from "@/components/create-category-form";
import { CreateProductForm } from "@/components/create-product-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sample data
const categories = [
  { id: "1", title: "Electronics", slug: "electronics" },
  { id: "2", title: "Clothing", slug: "clothing" },
  { id: "3", title: "Books", slug: "books" },
];

const products = [
  {
    id: "1",
    title: "Smartphone",
    description: "Latest model smartphone",
    image: "/placeholder.svg?height=400&width=600",
    price: 599.99,
    likes: 150,
    category: "Electronics",
  },
  {
    id: "2",
    title: "T-shirt",
    description: "Comfortable cotton t-shirt",
    image: "/placeholder.svg?height=400&width=600",
    price: 19.99,
    likes: 80,
    category: "Clothing",
  },
  {
    id: "3",
    title: "Novel",
    description: "Bestselling fiction novel",
    image: "/placeholder.svg?height=400&width=600",
    price: 9.99,
    likes: 200,
    category: "Books",
  },
];

export default function Home() {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto py-6 space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
            <Sheet
              open={isCreateCategoryOpen}
              onOpenChange={setIsCreateCategoryOpen}
            >
              <SheetTrigger asChild>
                <Button>Create New Category</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create New Category</SheetTitle>
                </SheetHeader>
                <CreateCategoryForm />
              </SheetContent>
            </Sheet>
          </div>
          <CategoryListing categories={categories} />
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <Sheet
              open={isCreateProductOpen}
              onOpenChange={setIsCreateProductOpen}
            >
              <SheetTrigger asChild>
                <Button>Create New Product</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create New Product</SheetTitle>
                </SheetHeader>
                <CreateProductForm categories={categories} />
              </SheetContent>
            </Sheet>
          </div>
          <ProductListing products={products} />
        </section>
      </main>
    </div>
  );
}
