import { MdDelete } from "react-icons/md";

type Answer = {
  id: number;
  choice: string;
};
type QuizItem = {
  id: number;
  question: string;
  answers: Answer[];
};

const AnswerInputComponent = ({
  label,
  deleteAnswer,
  choice,
  question
}: {
  label: string;
  deleteAnswer: (id: number) => void;
  choice: Answer;
  question: QuizItem;
}) => {
  return (
    <div className="flex flex-row items-center gap-3 w-full">
      <div className="flex flex-row gap-5 items-center w-full">
        <label className="text-lg font-semibold text-nowrap" htmlFor="quizName">
          {label}
        </label>
        <input
          type="text"
          className="px-4 w-full relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent py-2 text-base font-normal text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] dark:focus:border-primary"
          placeholder="Enter Question"
        />
      </div>

      <button
        type="button"
        className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 duration-300"
        onClick={() => deleteAnswer(question.id)}
      >
        <MdDelete color="white" size={20} />
      </button>
    </div>
  );
};

export default AnswerInputComponent;
