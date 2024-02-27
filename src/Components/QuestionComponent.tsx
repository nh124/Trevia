import InputProp from "./AnswerInputComponent";
import { IoAddOutline } from "react-icons/io5";
import QuestionInputComponent from "./QuestionInputcomponent";

type Answer = {
  id: number;
  choice: string;
};
type QuizItem = {
  id: number;
  question: string;
  answers: Answer[];
};

const QuestionComponent = ({
  label,
  answers,
  deleteQuestion,
  addAnswer,
  question,
  deleteAnswer
}: {
  label: string;
  answers: Answer[];
  deleteQuestion: () => void;
  addAnswer: (id: number) => void;
  deleteAnswer: (id: number) => void;
  question: QuizItem;
}) => {
  return (
    <form
      action=""
      className="w-[900px] flex flex-col items-end px-[10%] gap-3"
    >
      <div className="w-full flex flex-row gap-3">
        <QuestionInputComponent label={label} deleteQuestion={deleteQuestion} />
      </div>

      <div className="flex flex-col gap-2 w-[95%] h-auto">
        {answers.map((choice) => (
          <InputProp
            key={choice.id}
            label={`Answer Choice ${choice.id + 1}`}
            choice={choice}
            question={question}
            deleteAnswer={deleteAnswer}
          />
        ))}
      </div>
      <button
        type="button" // Prevent default form submission
        className="w-full h-[50px] bg-blue-500 rounded-lg text-white flex flex-row justify-center items-center"
        onClick={() => addAnswer(question.id)}
      >
        <IoAddOutline size={30} />
        <span>Add answer choice</span>
      </button>
    </form>
  );
};

export default QuestionComponent;
