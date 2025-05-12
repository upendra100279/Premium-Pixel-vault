"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">Premium Pixel Vault</span>
        <div className="space-x-6">
          <a href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About Us</a>
          <a href="/orders" className="text-gray-700 hover:text-indigo-600 font-medium">My Orders</a>
          <a href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}