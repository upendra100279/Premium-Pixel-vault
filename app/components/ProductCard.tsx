"use client";

import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IProduct, IMAGE_VARIANTS } from "@/models/Product";
import { Eye } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  // Determine lowest price
  const lowestPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0]?.price || 0
  );

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-300 overflow-hidden transform hover:scale-105">
      <Link href={`/products/${product._id}`} className="block relative">
        <div
          className="w-full bg-gray-100 overflow-hidden"
          style={{
            aspectRatio:
              IMAGE_VARIANTS.SQUARE.dimensions.width /
              IMAGE_VARIANTS.SQUARE.dimensions.height,
          }}
        >
          <IKImage
            path={product.imageUrl}
            alt={product.name}
            loading="eager"
            transformation={[
              {
                height: IMAGE_VARIANTS.SQUARE.dimensions.height.toString(),
                width: IMAGE_VARIANTS.SQUARE.dimensions.width.toString(),
                cropMode: "extract",
                focus: "center",
                quality: "80",
              },
            ]}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between h-full">
        <Link
          href={`/products/${product._id}`}
          className="hover:text-blue-600 transition-colors"
        >
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">
              From ${lowestPrice.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500">
              {product.variants.length} sizes
            </p>
          </div>
          <Link
            href={`/products/${product._id}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}