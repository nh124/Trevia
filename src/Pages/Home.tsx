import SearchComponent from "../Components/SearchComponent";
import QuizCard from "../Components/QuizCard";
import CreateQuiz from "../Components/CreateQuiz";
import { useState } from "react";
import quizJson from "../Utils/quizzes.json";
import Quiz from "../Components/QuizStarter";

const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [search, setSearch] = useState("");

  const setSearchValue = (event: any) => {
    setSearch(event.target.value);
  };

  type Answer = {
    id: number;
    choice: string;
  };
  type QuizItem = {
    id: number;
    question: string;
    answers: Answer[];
  };
  type Quiz = {
    id: number;
    quiz: QuizItem[];
  };
  const [openQuizEditor, setOpenQuizEditor] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const addQuiz = (quiz: Quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  return (
    <main className="w-full h-[100dvh] flex flex-col items-center relative max-w-[1920px]">
      <div className="w-full relative h-full">
        {selectedQuiz !== 0 && (
          <Quiz quizId={selectedQuiz} setSelectedQuiz={setSelectedQuiz} />
        )}
        <SearchComponent setSearchValue={setSearchValue} />
        <div
          className={`w-full ${
            selectedQuiz === 0 ? "h-auto" : "h-[90dvh] overflow-hidden"
          }  flex flex-wrap gap-5 py-3 justify-center relative`}
        >
          <div className="w-full h-auto flex flex-wrap gap-5 justify-center">
            {quizJson
              .filter((quiz) =>
                quiz.name?.toLowerCase().includes(search?.toLowerCase())
              )
              .map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  setSelectedQuiz={setSelectedQuiz}
                />
              ))}
          </div>
        </div>
      </div>

      <CreateQuiz
        openQuizEditor={openQuizEditor}
        setOpenQuizEditor={setOpenQuizEditor}
        addQuiz={addQuiz}
        quizzesLength={quizzes.length}
      />
    </main>
  );
};

export default Home;
