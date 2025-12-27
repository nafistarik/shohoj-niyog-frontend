import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Decision } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? match.split("=")[1] : null;
}

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
