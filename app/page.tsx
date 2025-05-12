"use client";

import React, { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import { IProduct } from "@/models/Product";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>

      <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Premium Pixel Vault</h1>
      <ImageGallery products={products} />
    </main>
    <footer className="w-full py-6 mt-8 bg-gray-100 text-center text-gray-500 text-sm rounded-t-lg shadow-inner">
      &copy; {new Date().getFullYear()} Premium Pixel Vault. All rights reserved.
    </footer>
    </>
  );
}
