import { ChangeEvent, useState } from "react";
import "./App.css";

const App = () => {
  interface Qna {
    id: number;
    question: string;
    answer: string;
  }
  const [usedAnswer, setUsedAnswer] = useState<string>("");
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);

  const data: Array<Qna> = [
    {
      id: 1,
      question: "What is my name",
      answer: "sajak shrestha",
    },
    {
      id: 2,
      question: "When is my birthday",
      answer: "Ashoj 15",
    },
  ];

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUsedAnswer(e.target.value);
  };

  const handleSubmit = (a: string) => {
    const inputAnswer = usedAnswer.toLowerCase();
    console.log(inputAnswer);
    console.log(a);
    inputAnswer === a ? setCheckAnswer(true) : setCheckAnswer(false);
    console.log(checkAnswer);
  };

  return (
    <>
      <div className="wrapper">
        <div className="Headings">
          <label>Know Your partner</label>
        </div>
        {data?.map(({ id, question }, index) => {
          return (
            <>
              <div key={index} className="qnaWrapper">
                <div className="question">
                  <label>
                    {id}. {question}
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={handleAnswer}
                />
                <label>{checkAnswer ? checkAnswer + "" : ""}</label>
                <button onClick={() => handleSubmit(answer)}>Submit</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
