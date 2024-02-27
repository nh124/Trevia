import { IoCloseOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import QuestionComponent from "../Components/QuestionComponent";

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

const CreateQuiz = ({
  openQuizEditor,
  setOpenQuizEditor,
  addQuiz,
  quizzesLength
}: {
  openQuizEditor: boolean;
  setOpenQuizEditor: React.Dispatch<React.SetStateAction<boolean>>;
  addQuiz: (quiz: Quiz) => void;
  quizzesLength: number;
}) => {
  const [quiz, setQuiz] = useState<QuizItem[]>([
    {
      id: 0,
      question: "",
      answers: [
        { id: 0, choice: "" },
        { id: 1, choice: "" }
      ]
    }
  ]);
  const createQuiz = (QuizItem: QuizItem[]) => {
    const quizObject = {
      id: quizzesLength,
      quiz: QuizItem
    };
    addQuiz(quizObject);
    setOpenQuizEditor(false);
  };
  const addQuestion = () => {
    const newQuestion: QuizItem = {
      id: quiz.length,
      question: "",
      answers: [
        { id: 0, choice: "" },
        { id: 1, choice: "" }
      ]
    };
    setQuiz([...quiz, newQuestion]);
  };

  const addAnswer = (id: number) => {
    const updatedQuiz = [...quiz];
    const question = updatedQuiz.find((q) => q.id === id);
    if (question && question.answers.length < 4) {
      const newAnswer: Answer = {
        id: question.answers.length,
        choice: ""
      };
      question.answers.push(newAnswer);
      setQuiz(updatedQuiz);
    }
  };
  const deleteAnswer = (id: number) => {
    const updatedQuiz = [...quiz];
    const question = updatedQuiz.find((q) => q.id === id);
    if (question && question.answers.length > 2) {
      question.answers.pop();
      setQuiz(updatedQuiz);
    }
  };

  const DeleteQuestion = () => {
    if (quiz.length <= 1) return;
    const updatedQuiz = [...quiz];
    updatedQuiz.pop();
    setQuiz(updatedQuiz);
  };
  return (
    <div
      className={`w-auto h-[70%] ${
        openQuizEditor ? "absolute" : "hidden"
      } bg-white z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-blue-400 shadow-lg flex justify-start  flex-col gap-5`}
    >
      <div className="w-full h-[90px] bg-blue-400 flex items-center px-6 flex-row justify-between">
        <div className="flex flex-row gap-3">
          <span className="text-3xl font-bold text-white">Quiz 1</span>
          <button>
            <MdModeEdit size={25} color="white" />
          </button>
        </div>
        <button
          className="w-fit h-fit p-3 bg-blue-500 rounded-full"
          onClick={() => setOpenQuizEditor(false)}
        >
          <IoCloseOutline size={30} color="white" />
        </button>
      </div>
      <div className="w-full h-auto flex justify-end py-3">
        <button
          className="w-fit h-fit p-3 bg-blue-400 rounded-md mr-4"
          onClick={() => addQuestion()}
        >
          Add a question
        </button>
      </div>
      <div className="flex flex-col gap-3 items-end overflow-y-auto">
        {quiz.map((question) => (
          <QuestionComponent
            key={question.id}
            label={`Question ${question.id + 1}`}
            question={question}
            answers={question.answers}
            deleteQuestion={DeleteQuestion}
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
          />
        ))}
      </div>
      <div className="w-full h-auto flex justify-end py-3">
        <button
          className="w-fit h-fit p-3 bg-blue-400 rounded-md mr-4"
          onClick={() => createQuiz(quiz)}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
