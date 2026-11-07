export type Decision =
  | "pending"
  | "interested"
  | "not_interested"
  | "accept"
  | "reject";

export interface QuestionAnswer {
  question_id: string;
  question: string;
  answer: string;
}

/** A session as the interviewer sees it, from `/api/findall/` and `/api/find/:id`. */
export interface InterviewSession {
  id: string;
  position: string;
  stack: string | string[];
  level: string;
  created_by?: string;
  qa_pairs?: QuestionAnswer[] | null;
  allowed_candidates?: string[];
  scheduled?: string | null;
}

/** A session in the candidate's list, from `/api/findall/`. */
export interface CandidateSession {
  id: string;
  position?: string | null;
  company?: string | null;
  scheduled_time?: string | null;
  qa_pairs?: QuestionAnswer[] | null;
}

/** A question as the candidate gets it, from `/api/find/:id`: no ideal answer. */
export interface InterviewQuestion {
  question: string;
}

/** One candidate's scored answers, from `/api/results/:session_id/`. */
export interface CandidateResponse {
  id: string;
  session_id: string;
  candidate_id: string;
  candidate_name: string;
  candidate_mail: string;
  responses: {
    question_id: string;
    given_answer: string;
    score: number;
  }[];
  total_score: number;
  decision: Decision;
}

/** The candidate's own result for one session, from `/api/results/`. */
export interface CandidateResult {
  session_id: string;
  position?: string | null;
  company?: string | null;
  decision: Decision;
}

export interface CreateSessionPayload {
  position: string;
  stacks: string[];
  level: string;
  allowed_candidates: string[];
  num_questions: number;
  scheduled: string;
}
