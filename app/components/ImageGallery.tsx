import { IProduct } from "@/models/Product";
import ProductCard from "./ProductCard";

interface ImageGalleryProps {
  products: IProduct[];
}

export default function ImageGallery({ products }: ImageGalleryProps) {
  return (
    <section className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id?.toString()}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow"
          >
            <ProductCard product={product} />
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-inner">
            <p className="text-gray-500 text-lg font-medium">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
