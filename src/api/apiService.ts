import { QuestionType } from "../store/quizStore";
import api from "./api";

export interface FetchQuizOptions {
  random?: boolean;
  discipline?: string;
  language?: string;
}
export interface RegisterOptions {
  nomeCompleto: string;
  email: string;
  senha: string;
}

export async function fetchQuizQuestions(
  quantity: number,
  options: FetchQuizOptions = {}
): Promise<QuestionType[]> {
  const { random, discipline, language } = options;
  const queryParams = new URLSearchParams();

  queryParams.append("quantity", quantity.toString());

  if (random !== undefined) {
    queryParams.append("random", random.toString());
  }
  if (discipline) {
    queryParams.append("discipline", discipline);
  }
  if (language) {
    queryParams.append("language", language);
  }

  const apiUrl = `https://api.quiz.saggioro.xyz/question?${queryParams.toString()}`;
  console.log("A chamar API: ", apiUrl);

  const response = await api.get(apiUrl);

  if (response.status >= 400) {
    let errorData;
    try {
      errorData = response;
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(
      `Falha ao buscar perguntas da API: ${response.status} - ${
        errorData?.data.message || "Erro desconhecido"
      }`
    );
  }

  const fetchedQuestions: QuestionType[] = response.data;
  return fetchedQuestions;
}
