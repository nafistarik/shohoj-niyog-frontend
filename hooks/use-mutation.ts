import { useState } from "react";
import type { ApiResponse } from "@/lib/api/fetchApi";

type MutationFn<S, T> = (payload: S) => Promise<ApiResponse<T>>;

export function useMutation<S, T>(mutationFn: MutationFn<S, T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = async (
    payload: S,
    options?: {
      onSuccess?: (data: T | null) => void;
      onError?: (message: string) => void;
    }
  ) => {
    setLoading(true);
    setError("");

    const res = await mutationFn(payload);

    setLoading(false);

    if (!res.success) {
      setError(res.message);
      options?.onError?.(res.message);
      return;
    }

    options?.onSuccess?.(res.data);
  };

  return { mutate, loading, error };
}
