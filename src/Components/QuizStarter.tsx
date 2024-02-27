import { useState } from "react";
import Quiz from "../Utils/quizzes";
import ScoreDisplay from "./ScoreDisplay";
const QuizStarter = ({
  quizId,
  setSelectedQuiz
}: {
  quizId: number;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const quiz = Quiz.filter((quiz) => quiz.id === quizId)[0];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const getQuestions = () => {
    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion.question;
  };

  const getOptions = () => {
    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion.options;
  };
  const checkQuestion = (options) => {
    if (currentQuestionIndex >= quiz.questions.length - 1) {
      return;
    } else {
      if (options.is_correct) setScore(score + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  return (
    <>
      {currentQuestionIndex >= quiz.questions.length - 1 ? (
        <ScoreDisplay score={score * 10} setSelectedQuiz={setSelectedQuiz} />
      ) : (
        <div className="absolute top-0 left-0 w-full min-h-[100dvh] h-auto bg-white z-20 flex flex-col justify-center items-center gap-10 animate-fadeAnimation">
          <div className="flex flex-col gap-10 justify-center items-center md:w-[50%] text-center w-full h-full">
            <div className="w-full h-[10%] flex flex-row justify-center items-center gap-3 p-7">
              <div className="w-[60%] h-[20px] relative flex items-center bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-blue-400 rounded-full duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                    }%`
                  }}
                ></div>
              </div>
              <span className="text-lg font-semibold">
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </span>
            </div>
            <span className="font-bold text-2xl">{getQuestions()}</span>
            <div className="w-full min-h-[40%] h-auto grid grid-cols-2 grid-rows-2 gap-6 justify-center items-center p-4 place-items-center">
              {getOptions().map((option) => (
                <button
                  className="min-h-[100px] md:min-h-[200px]  w-full h-full bg-slate-200 border-4 rounded-md border-blue-400 hover:bg-blue-400 duration-500"
                  key={option.id}
                  onClick={() => checkQuestion(option)}
                >
                  {option.choice}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizStarter;
