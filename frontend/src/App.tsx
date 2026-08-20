import React, { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "./hooks/useProducts";
import { type Product, type ProductInput } from "./types/Product";

const InventorySystem = () => {
  const { data: products, isLoading, isError } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      console.log(formData);
      updateMutation.mutate({ id: editingId, data: formData });
      setEditingId(null);
    } else {
      createMutation.mutate(formData);
    }
    setFormData({ name: "", price: 0, quantity: 0, description: "" });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description || "",
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "out_of_stock") return "red";
    if (status === "low_stock") return "orange";
    return "green";
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError)
    return (
      <p style={{ color: "red" }}>
        Error loading products. Is the backend running?
      </p>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Inventory Mini System</h1>

      {/* PRODUCT FORM */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <input
            required
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            required
            type="number"
            min="0"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            required
            type="number"
            min="0"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  price: 0,
                  quantity: 0,
                  description: "",
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {products?.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products?.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{product.name}</strong> - ${product.price} <br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  {product.description}
                </span>
              </div>

              <div
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <div style={{ textAlign: "center" }}>
                  <div>
                    Qty: <strong>{product.quantity}</strong>
                  </div>
                  <div
                    style={{
                      color: getStatusColor(product.status),
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.status.replace("_", " ").toUpperCase()}
                  </div>
                </div>

                {/* Quick Quantity Buttons */}
                <div>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: product.id,
                        data: { quantity: product.quantity + 1 },
                      })
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: product.id,
                        data: { quantity: Math.max(0, product.quantity - 1) },
                      })
                    }
                  >
                    -
                  </button>
                </div>

                <button onClick={() => handleEdit(product)}>Edit</button>
                <button
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <InventorySystem />;
}
