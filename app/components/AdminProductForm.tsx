"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FileUpload from "./FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useNotification } from "./Notification";
import { IMAGE_VARIANTS, ImageVariantType } from "@/models/Product";
import { apiClient, ProductFormData } from "@/lib/api-client";

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      variants: [
        {
          type: "SQUARE" as ImageVariantType,
          price: 9.99,
          license: "personal",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("imageUrl", response.filePath);
    showNotification("Image uploaded successfully!", "success");
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      await apiClient.createProduct(data);
      showNotification("Product created successfully!", "success");

      // Reset form after successful submission
      setValue("name", "");
      setValue("description", "");
      setValue("imageUrl", "");
      setValue("variants", [
        {
          type: "SQUARE" as ImageVariantType,
          price: 9.99,
          license: "personal",
        },
      ]);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to create product",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <div className="form-control">
        <label className="label font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          className={`input input-bordered bg-gray-50 ${errors.name ? "border-red-500" : ""}`}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label font-medium text-gray-700">Description</label>
        <textarea
          className={`textarea textarea-bordered bg-gray-50 h-24 ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-sm text-red-500 mt-1">{errors.description.message}</span>
        )}
      </div>

      <div className="form-control">
        <label className="label font-medium text-gray-700">Product Image</label>
        <FileUpload onSuccess={handleUploadSuccess} />
      </div>

      <div className="divider text-gray-500">Image Variants</div>

      {fields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label font-medium text-gray-700">Size & Aspect Ratio</label>
              <select
                className="select select-bordered bg-white"
                {...register(`variants.${index}.type`)}
              >
                {Object.entries(IMAGE_VARIANTS).map(([key, value]) => (
                  <option key={key} value={value.type}>
                    {value.label} ({value.dimensions.width}x{value.dimensions.height})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-medium text-gray-700">License</label>
              <select
                className="select select-bordered bg-white"
                {...register(`variants.${index}.license`)}
              >
                <option value="personal">Personal Use</option>
                <option value="commercial">Commercial Use</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                className="input input-bordered bg-gray-50"
                {...register(`variants.${index}.price`, {
                  valueAsNumber: true,
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                })}
              />
              {errors.variants?.[index]?.price && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.variants[index]?.price?.message}
                </span>
              )}
            </div>

            <div className="flex items-end justify-end">
              <button
                type="button"
                className="btn btn-sm btn-outline btn-error"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-outline btn-block rounded-lg"
        onClick={() =>
          append({
            type: "SQUARE" as ImageVariantType,
            price: 9.99,
            license: "personal",
          })
        }
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Variant
      </button>

      <button
        type="submit"
        className="btn btn-primary btn-block rounded-lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Product...
          </>
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
}
