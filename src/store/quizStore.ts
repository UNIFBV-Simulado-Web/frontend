import { create } from "zustand";
import { fetchQuizQuestions, FetchQuizOptions } from "../api/apiService";
import { useToasterStore } from "./toasterStore";
import api from "@/api/api";

export interface FileType {
  id: number;
  link: string;
}

export interface AlternativeType {
  id: number;
  letter: string;
  text?: string | null;
  is_correct: boolean;
  image?: string | null;
}

export interface QuestionType {
  id: number;
  title?: string | null;
  discipline?:
    | "ciencias-humanas"
    | "matematica"
    | "ciencias-natureza"
    | "linguagens"
    | null;
  language?: "espanhol" | null;
  year: number;
  context?: string | null;
  correct_alternative: string;
  introduction?: string | null;
  alternatives: AlternativeType[];
  files?: FileType[] | null;
}
export interface UserAnswers {
  questionId: number;
  selectedAlternativeId: number;
}

interface QuizState {
  questions: QuestionType[];
  currentQuestionIndex: number;
  userAnswers: UserAnswers[];
  score: number;
  quizStatus: "idle" | "loading" | "active" | "finished" | "error";
  currentQuizParams: {
    quantity: number;
    options?: FetchQuizOptions;
  } | null;
  errorMessage?: string | null;

  loadAndStartQuiz: (
    quantity: number,
    options?: FetchQuizOptions
  ) => Promise<void>;
  answerQuestion: (questionId: number, alternativeId: AlternativeType) => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => QuestionType | null;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  quizStatus: "idle",
  currentQuizParams: null,
  errorMessage: null,

  loadAndStartQuiz: async (quantity, options = {}) => {
    set({
      quizStatus: "loading",
      currentQuizParams: { quantity, options },
      score: 0,
      userAnswers: [],
      currentQuestionIndex: 0,
      questions: [],
      errorMessage: null,
    });

    try {
      const fetchedQuestions = await fetchQuizQuestions(quantity, options);

      if (fetchedQuestions && fetchedQuestions.length > 0) {
        set({ questions: fetchedQuestions, quizStatus: "active" });
      } else {
        const subjectInfo = options.discipline
          ? ` para a disciplina ${options.discipline}`
          : "";
        const langInfo = options.language
          ? ` no idioma ${options.language}`
          : "";
        const randomInfo = options.random ? " (aleatório)" : "";
        set({
          questions: [],
          quizStatus: "error",
          errorMessage: `Nenhuma pergunta encontrada com quantidade ${quantity}${subjectInfo}${langInfo}${randomInfo}.`,
        });
        console.warn(
          `Nenhuma pergunta encontrada para os critérios: quantity=${quantity}, options=${JSON.stringify(
            options
          )}`
        );
      }
    } catch (error: any) {
      console.error("Erro ao carregar perguntas da API:", error);
      set({
        questions: [],
        quizStatus: "error",
        errorMessage:
          error.message ||
          "Ocorreu um erro desconhecido ao buscar as perguntas.",
      });
    }
  },

  answerQuestion: async (questionId, selectedAlternative) => {
    const { addToast } = useToasterStore.getState();

    const currentQuestion = get().questions.find((q) => q.id === questionId);
    if (!currentQuestion || get().quizStatus !== "active") return;

    let newScore = get().score;
    if (selectedAlternative.is_correct) {
      newScore += 1;
    }

    set((state) => ({
      userAnswers: [
        ...state.userAnswers,
        { questionId, selectedAlternativeId: selectedAlternative.id },
      ],

      score: newScore,
    }));
    console.log(get().userAnswers);
    const nextIndex = get().currentQuestionIndex + 1;
    if (nextIndex < get().questions.length) {
      set({ currentQuestionIndex: nextIndex });
    } else {
      try {
        await api.post(
          "https://api.quiz.saggioro.xyz/user-answer",
          get().userAnswers
        );
        set({ quizStatus: "finished" });
      } catch (e: any) {
        console.log(e);
        addToast({ message: e.data.message, type: "error" });

        set({ errorMessage: "Erro ao salvar questões respondidas" });
      }
    }
  },

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex, quizStatus } = get();
    if (
      quizStatus === "active" &&
      questions.length > 0 &&
      currentQuestionIndex < questions.length
    ) {
      return questions[currentQuestionIndex];
    }
    return null;
  },

  resetQuiz: () => {
    set({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      quizStatus: "idle",
      currentQuizParams: null,
      errorMessage: null,
    });
  },
}));
