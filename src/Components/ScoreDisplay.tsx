import { useEffect, useState } from "react";
const ScoreDisplay = ({
  score,
  setSelectedQuiz
}: {
  score: number;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [scoreStrokeOffset, setScoreStrokeOffset] = useState<number>(64);
  const [displayValue, setDisplayValue] = useState(0);
  const [message, setMessage] = useState({
    message: "",
    color: ""
  });
  useEffect(() => {
    if (score > 80) {
      setMessage({
        message: "Good you did well!!",
        color: "#60A5FA"
      });
    } else if (score >= 50 && displayValue < 80) {
      setMessage({
        message: "Getting Better!!",
        color: "#FFFF00"
      });
    } else if (score < 50) {
      setMessage({
        message: "Need a bit more work!!",
        color: "#FF0000"
      });
    }
  }, [score, displayValue]);

  useEffect(() => {
    const newScoreStrokeOffset = 64 - 64 * (score / 100);
    const timeoutId = setTimeout(() => {
      setScoreStrokeOffset(newScoreStrokeOffset);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [score]);

  useEffect(() => {
    const animateNumber = () => {
      if (score === 0) return;
      let start = 0;
      const end = score;
      const duration = 1000; // in milliseconds
      const stepTime = Math.abs(Math.floor(duration / (end - start)));
      const timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    };
    const timeout = setTimeout(animateNumber, 200);

    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 z-30 bg-white">
      <div className="w-full h-full relative flex flex-col justify-center items-center gap-6">
        <span className="text-3xl font-semibold">{message.message}</span>
        <div className="w-[80%] h-[50%] md:w-[500px] md:h-[500px]  relative flex items-center justify-center">
          <svg
            className="h-4/4 w-4/4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeLinecap="round"
            style={{
              color: `${message.color}`
            }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke-width="3"
              stroke-dasharray="64"
              stroke-dashoffset="0"
            ></circle>
            <circle
              className="opacity-75 duration-1000"
              cx="12"
              cy="12"
              r="10"
              stroke-width="3"
              stroke-dasharray="64"
              stroke-dashoffset={scoreStrokeOffset}
            ></circle>
          </svg>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold">
            {displayValue}%
          </span>
        </div>
        <button
          className="p-4 hover:bg-blue-400 text-lg hover:text-white font-bold border-4 rounded-lg border-blue-400 duration-300"
          onClick={() => setSelectedQuiz(0)}
        >
          Finished
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;

// 40
