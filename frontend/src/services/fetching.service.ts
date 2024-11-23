import axios from "axios";
import { MethodsType } from "@/models";

export async function fetching<T, F>(
  method: MethodsType,
  endpoint: string,
  body: T = {} as T,
): Promise<F | Error> {
  try {
    if (method === "POST") {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, body);
      return response.data;
    }
    if (method === "DELETE") {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}${endpoint}`);
      return response.data;
    }
    if (method === "GET") {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
      return response.data;
    }
    throw new Error("Unsupported method");
  } catch (error) {
    return error as Error;
  }
}
