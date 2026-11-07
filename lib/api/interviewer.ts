import { deleteData, patchData, postData } from "@/lib/api/methods";
import type { CreateSessionPayload, Decision } from "@/lib/types";

export interface CreateSessionResponse {
  Session_ID: string;
}

type DecidePayload = {
  session_id: string;
  candidate_id?: string;
  decision: Decision;
};

export const createSessionApi = (payload: CreateSessionPayload) =>
  postData<CreateSessionPayload, CreateSessionResponse>("/api/gen/", payload);

export const decideMutation = (payload: DecidePayload) =>
  patchData<DecidePayload, null>("/api/decide/", payload);

export const deleteSessionMutation = async (sessionId: string) => {
  return deleteData(`/api/delete/${sessionId}/`);
};
