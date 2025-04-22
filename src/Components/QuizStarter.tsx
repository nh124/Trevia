import { useState, useMemo } from "react";
import Quiz from "../Utils/quizzes.json";
import ScoreDisplay from "./ScoreDisplay";
import Lottie from "lottie-react";
import correctAnim from "../assets/lottie/correct.json";
import wrongAnim from "../assets/lottie/wrong.json";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QuizStarter = ({
  quizId,
  setSelectedQuiz
}: {
  quizId: number;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const quiz = Quiz.find((q: any) => q.id === quizId)!;
  const questions = useMemo(() => {
    return shuffleArray(
      quiz.questions.map((q: any) => ({
        ...q,
        options: shuffleArray(q.options)
      }))
    );
  }, [quiz.questions]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // null = unanswered, true/false = show feedback
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const checkQuestion = (option: any) => {
    // ignore extra clicks while feedback is showing
    if (isCorrect !== null) return;

    const correct = option.is_correct;
    if (correct) setScore((s) => s + 1);

    // trigger feedback
    setIsCorrect(correct);

    // after 1s, clear feedback & advance
    setTimeout(() => {
      setIsCorrect(null);
      setCurrentQuestionIndex((idx) =>
        idx >= questions.length - 1 ? idx : idx + 1
      );
    }, 1500);
  };

  // if we're at last question, render score
  if (currentQuestionIndex >= questions.length - 1) {
    return (
      <ScoreDisplay score={score * 10} setSelectedQuiz={setSelectedQuiz} />
    );
  }

  return (
    <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center gap-10 animate-fadeAnimation">
      {/* progress + feedback */}
      <div className="relative flex items-center justify-between w-[50%] p-7">
        {/* progress bar */}
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden mr-4">
          <div
            className="h-full bg-blue-400 rounded-full transition-width duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {/* counter */}
        <span className="text-xl font-bold">
          {currentQuestionIndex + 1}/{questions.length}
        </span>

        {/* feedback indicator */}
        {isCorrect !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20">
            <Lottie
              animationData={isCorrect ? correctAnim : wrongAnim}
              loop={false}
              style={{ width: 40, height: 40 }}
            />
          </div>
        )}
      </div>

      {/* question */}
      <p className="text-2xl font-bold text-center px-4">
        {currentQuestion.question}
      </p>

      {/* options grid */}
      <div className="grid grid-cols-2 gap-6 w-full md:w-1/2 p-4">
        {currentQuestion.options.map((opt: any) => (
          <button
            key={opt.id}
            className={`min-h-[100px] md:min-h-[200px] w-full rounded-md border-4 
                      ${opt.is_correct ? "border-green-500" : "border-red-500"} 
                      bg-slate-200 hover:bg-blue-400 transition-colors duration-200 ${
                        isCorrect !== null &&
                        opt.is_correct &&
                        "animate-flashAnimation"
                      }`}
            onClick={() => checkQuestion(opt)}
            disabled={isCorrect !== null}
          >
            {opt.choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizStarter;
