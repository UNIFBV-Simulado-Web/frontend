import QuizComponent from "@/components/quiz";
import { Suspense } from "react";

const Quiz: React.FC = () => {
  return (
    <div
      className="relative
      min-h-screen
      w-full
      bg-[#0C222A]
      before:absolute
      before:inset-0
      before:bg-[radial-gradient(circle_500px_at_top_left,_rgba(22,78,99,0.5),_transparent_80%)]
      after:absolute
      after:inset-0
      after:bg-[radial-gradient(circle_500px_at_bottom_right,_rgba(22,78,99,0.5),_transparent_80%)]
      flex flex-col items-center"
    >
      <div className="w-11/12 h-px bg-white/50 mb-8"></div>

      <div className="relative w-full z-10 flex-grow">
        <Suspense>
          <QuizComponent />
        </Suspense>
      </div>

      <footer className="w-full py-6 text-center">
        <p className="text-sm text-gray-400">
          <span>© 2025 Quiz Aprende+</span>
          <span className="mx-2">|</span>
          <span>Projeto acadêmico-extensivo</span>
          <span className="mx-2">|</span>
          <span>Wyden-UniFBV</span>
        </p>
      </footer>
    </div>
  );
};
export default Quiz;
