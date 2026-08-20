import axios from "axios";
import { type Product, type ProductInput } from "../types/Product";

const API_URL = "http://localhost:4000/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createProduct = async (
  product: ProductInput,
): Promise<Product> => {
  const { data } = await axios.post(API_URL, product);
  return data;
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<ProductInput>;
}): Promise<Product> => {
  console.log(data);
  const { data: responseData } = await axios.patch(`${API_URL}/${id}`, data);
  console.log(responseData);
  return responseData;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
