import { create } from "zustand";
import { fetchQuizQuestions, FetchQuizOptions } from "../api/apiService";

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

interface QuizState {
  questions: QuestionType[];
  currentQuestionIndex: number;
  userAnswers: Record<number, string>;
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
  answerQuestion: (questionId: number, selectedLetter: string) => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => QuestionType | null;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,
  quizStatus: "idle",
  currentQuizParams: null,
  errorMessage: null,

  loadAndStartQuiz: async (quantity, options = {}) => {
    set({
      quizStatus: "loading",
      currentQuizParams: { quantity, options },
      score: 0,
      userAnswers: {},
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

  answerQuestion: (questionId, selectedLetter) => {
    const currentQuestion = get().questions.find((q) => q.id === questionId);
    if (!currentQuestion || get().quizStatus !== "active") return;

    let newScore = get().score;
    if (selectedLetter === currentQuestion.correct_alternative) {
      newScore += 1;
    }

    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: selectedLetter,
      },
      score: newScore,
    }));

    const nextIndex = get().currentQuestionIndex + 1;
    if (nextIndex < get().questions.length) {
      set({ currentQuestionIndex: nextIndex });
    } else {
      set({ quizStatus: "finished" });
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
      userAnswers: {},
      score: 0,
      quizStatus: "idle",
      currentQuizParams: null,
      errorMessage: null,
    });
  },
}));
