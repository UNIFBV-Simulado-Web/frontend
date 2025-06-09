import { QuestionType } from "../store/quizStore";

export interface FetchQuizOptions {
  random?: boolean;
  discipline?: string;
  language?: string;
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

  const response = await fetch(apiUrl);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(
      `Falha ao buscar perguntas da API: ${response.status} - ${
        errorData?.message || "Erro desconhecido"
      }`
    );
  }

  const fetchedQuestions: QuestionType[] = await response.json();
  return fetchedQuestions;
}
