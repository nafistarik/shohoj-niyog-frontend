import { useEffect, useState } from "react";
import { getData } from "@/lib/api/methods";
import type { ApiResponse } from "@/lib/api/fetchApi";

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!endpoint) return;

    let active = true;
    setLoading(true);
    setError("");

    getData<T>(endpoint)
      .then((res: ApiResponse<T>) => {
        if (!active) return;

        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message);
        }
      })
      .catch(() => {
        if (active) setError("Something went wrong");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
