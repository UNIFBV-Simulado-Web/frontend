interface Alternative {
  letter: string;
  text: string;
  file: string | null;
  isCorrect: boolean;
}

interface QuestionAPI {
  title: string;
  index: number;
  discipline: string;
  language: string;
  year: number;
  context: string;
  files: string[];
  correctAlternative: string;
  alternativesIntroduction: string;
  alternatives: Alternative[];
}
