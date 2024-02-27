import { useState } from "react";
// import QuestionComponent from "./QuestionComponent";

const Question = () => {
  type options = {
    id: number;
    label: string;
  };
  const [question, setQuestion] = useState([""]);
  const [quiz, setQuiz] = useState<
    { id: number; question: string; answers: options[] }[]
  >([
    {
      id: 0,
      question: "",
      answers: []
    }
  ]);

  const addQuestion = () => {
    const currentQuiz = [...quiz];
    // const newQuiz = {
    //   question: "",
    //   answers: ["", ""]
    // };
    // currentQuiz.push(newQuiz);
    setQuiz(currentQuiz);
    setQuestion([...question, ""]);
  };

  // const deleteQuestion = () => {
  //   if (question.length > 1) {
  //     const newQuestion = [...question];
  //     newQuestion.pop();
  //     setQuestion(newQuestion);
  //   }
  // };
  return (
    <div className="flex flex-col gap-3 items-end overflow-y-auto">
      <button
        className="w-fit h-fit p-3 bg-blue-400 rounded-md mr-4"
        onClick={() => addQuestion()}
      >
        Add Question
      </button>
    </div>
  );
};

export default Question;
