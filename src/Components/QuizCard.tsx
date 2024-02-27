const QuizCard = ({
  quiz,
  setSelectedQuiz
}: {
  setSelectedQuiz: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button
      className="relative group h-[150px] flex"
      onClick={() => setSelectedQuiz(quiz.id)}
    >
      <div className="relative w-[300px] h-full bg-slate-100  p-4 gap-3 z-10 grid items-center duration-300 hover:scale-105 hover:shadow-lg">
        <span className="text-lg font-semibold">{quiz.name}</span>
      </div>
    </button>
  );
};

export default QuizCard;
