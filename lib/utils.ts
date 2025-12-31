import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Decision } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const found = cookies.find((row) => row.startsWith(`${name}=`));

  return found ? decodeURIComponent(found.split("=")[1]) : null;
};


type CookieOptions = {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  if (typeof document === "undefined") return;

  const {
    path = "/",
    maxAge,
    secure = true,
    sameSite = "lax",
  } = options;

  let cookie = `${name}=${encodeURIComponent(value)}; path=${path};`;

  if (maxAge !== undefined) {
    cookie += ` max-age=${maxAge};`;
  }

  if (secure) {
    cookie += ` secure;`;
  }

  cookie += ` samesite=${sameSite};`;

  document.cookie = cookie;
};

export const clearCookie = (name: string, path = "/") => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; max-age=0; path=${path};`;
};

export const isSelectEnabled = (
  role: "interviewer" | "candidate",
  decision: Decision
) => {
  if (role === "interviewer") {
    return decision === "pending";
  }
  if (role === "candidate") {
    return decision === "interested";
  }
  return false;
};

export const getAllowedOptions = (
  role: "interviewer" | "candidate",
  decision: Decision
) => {
  if (role === "interviewer" && decision === "pending") {
    return ["interested", "not_interested"];
  }
  if (role === "candidate" && decision === "interested") {
    return ["accept", "reject"];
  }
  return [];
};
