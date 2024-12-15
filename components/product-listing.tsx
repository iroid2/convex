"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  likes: number;
  category: string;
};

type ProductListingProps = {
  products: Product[];
};

export function ProductListing({ products }: ProductListingProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          {/* <CardHeader className="p-0">
            <div className="relative">
              <Image
                src={"/photo.png"}
                alt={product.title}
                width={512}
                height={512}
                className="object-cover w-full"
              />
            </div>
          </CardHeader> */}
          <CardContent className="p-4">
            <CardTitle>{product.title}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-2 text-sm font-medium">
              Category: {product.category}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLike(product.id)}
              aria-label={`Like ${product.title}`}
            >
              <Heart
                className={`h-5 w-5 ${
                  likedProducts.has(product.id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
              <span className="ml-1">
                {product.likes + (likedProducts.has(product.id) ? 1 : 0)}
              </span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
