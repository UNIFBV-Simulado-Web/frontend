import api from "@/api/api";
import { create } from "zustand";

interface AnswerAlternative {
  id: number;
  question_id: number;
  letter: string;
  text: string | null;
  is_correct: boolean;
  image: string | null;
}

interface AnswerQuestion {
  id: number;
  title: string;
  discipline: string | null;
  year: number;
  context: string | null;
  correct_alternative: string;
  introduction: string | null;
  alternatives: AnswerAlternative[];
}

export interface UserAnswer {
  id: number;
  userId: number;
  questionId: number;
  selectedAlternativeId: number;
  isCorrect: boolean;
  answeredAt: string;
  question: AnswerQuestion;
}

export interface NewAnswerPayload {
  questionId: number;
  selectedAlternativeId: number;
}

interface UserAnswerState {
  answers: UserAnswer[];
  isLoading: boolean;
  error: string | null;
  fetchAnswers: () => Promise<void>;
  clearAnswers: () => void;
}

export const useUserAnswerStore = create<UserAnswerState>((set) => ({
  answers: [],
  isLoading: false,
  error: null,

  fetchAnswers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<UserAnswer[]>("/user-answer");
      set({ answers: response.data, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Falha ao buscar o histórico de respostas.";
      console.error("Erro em fetchAnswers:", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearAnswers: () => {
    set({ answers: [], isLoading: false, error: null });
  },
}));
