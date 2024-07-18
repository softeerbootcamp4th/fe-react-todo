import { useState } from 'react';

interface UseFetchType {
  method: "get" | "post" | "patch" | "delete";
  path: string;
}

export function useFetch<T>({ method, path } : UseFetchType) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const baseUrl = "http://localhost:3000";
  let url = baseUrl + path;
  
  const fetchData = async ({ body = {}, param = null }) => {
    console.log(method, path)
    url += param ? `/${param}` : ""
    setLoading(true);
    try {
      let res;
      if (method === "get") {
        res = await fetch(url);
      } else {
        res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const result = await res.json();
      setData(result?.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, error, loading, fetchData };
}