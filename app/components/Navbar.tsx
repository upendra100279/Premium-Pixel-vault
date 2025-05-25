"use client";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow mb-6">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    {/* Logo */}
    <a href="/" className="flex items-center">
  <Image
    src="/premium-pixel-vault.gif"
    alt="Premium Pixel Vault Logo"
    width={100}
    height={100}
    className="w-[100px] h-[100px] mx-auto p-2 rounded-full border-[2px] shadow-md"
  />
  <span className="ml-4 text-xl font-bold text-indigo-600 hidden sm:inline">
    Premium Pixel Vault
  </span>
</a>
    <div className="space-x-6">
      <a href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About Us</a>
      <a href="/orders" className="text-gray-700 hover:text-indigo-600 font-medium">My Orders</a>
      <a href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact Us</a>
    </div>
  </div>
</nav>
  );
}