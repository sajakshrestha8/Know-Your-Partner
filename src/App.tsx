/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from "react";
import "./App.css";

const App = () => {
  interface Qna {
    id: number;
    question: string;
    answer: string;
  }
  const [usedAnswer, setUsedAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const data: Array<Qna> = [
    {
      id: 1,
      question: "What is my name",
      answer: "sajak shrestha",
    },
    {
      id: 2,
      question: "When is my birthday",
      answer: "ashoj 15",
    },
    {
      id: 3,
      question: "Where was our first Date",
      answer: "taudaha",
    },
    {
      id: 4,
      question: "What is my age",
      answer: "21",
    },
    {
      id: 5,
      question: "Where do I live",
      answer: "satungal",
    },
  ];

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUsedAnswer(e.target.value);
  };

  const handleSubmit = (a: string) => {
    setUsedAnswer("");
    setCurrentIndex(currentIndex + 1);
    const inputAnswer = usedAnswer.toLowerCase();
    if (inputAnswer === a) {
      setResult(result + 1);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="heading-wrapper">
          <div className="Headings">
            <label>Know Your partner</label>
          </div>
          <div className="info">
            <label>
              Do, you want to know the secret message of your partner? You can
              read it by answering the questions below.
            </label>
          </div>
          {currentIndex < data.length ? (
            <div className="qnaWrapper">
              <div className="question">
                <label>
                  {`${data[currentIndex].id}. ${data[currentIndex].question}`}?
                </label>
              </div>
              <div>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your answer"
                  onChange={handleAnswer}
                  value={usedAnswer}
                />
              </div>
              <div className="button">
                <button onClick={() => handleSubmit(data[currentIndex].answer)}>
                  Submit
                </button>
              </div>
            </div>
          ) : result < 2 ? (
            <div>Sry you don't know your partner well. {result}</div>
          ) : (
            <div>You know your partner very very well Nice {result}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
