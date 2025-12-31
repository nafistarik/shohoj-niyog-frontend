// import { getData } from "@/lib/api/methods";

// export interface InterviewSession {
//   id: string;
//   scheduled: string;
//   allowed_candidates: any[];
// }

// export const getInterviewerSessions = () =>
//   getData<InterviewSession[]>("/api/findall/");

import { patchData } from "@/lib/api/methods";

type DecidePayload = {
  session_id: string;
  candidate_id: string;
  decision: string;
};

export const decideMutation = (payload: DecidePayload) =>
  patchData<DecidePayload, null>("/api/decide/", payload);
