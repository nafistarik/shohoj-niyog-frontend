// shortcut: falls back to the current backend so existing deploys keep working; drop the fallback once every environment sets the variable.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://16.16.186.219.sslip.io";

/** How long a candidate has to answer one question, in seconds. */
export const ANSWER_TIME_LIMIT_SECONDS = 120;
