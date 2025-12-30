import { useCallback, useEffect, useState } from "react";
import { getData } from "@/lib/api/methods";

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError("");

    const res = await getData<T>(endpoint);

    if (res.success) {
      setData(res.data);
    } else {
      setError(res.message);
    }

    setLoading(false);
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
