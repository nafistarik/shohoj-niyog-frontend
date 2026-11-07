import { Decision } from "../types";

export const DECISIONS: { value: Decision; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "interested", label: "Interested" },
  { value: "not_interested", label: "Not Interested" },
  { value: "accept", label: "Accept" },
  { value: "reject", label: "Reject" },
];

/** Maps a select's string value back to a known decision, or `undefined` for anything else. */
export const toDecision = (value: string): Decision | undefined =>
  DECISIONS.find((option) => option.value === value)?.value;
