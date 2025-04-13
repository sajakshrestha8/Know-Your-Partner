/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import Button from "./Components/Button/Button";
import { useNavigate } from "react-router";

const App = () => {
  interface Qna {
    id: number;
    question: string;
    answer: string;
  }
  const [usedAnswer, setUsedAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [readMoreBtn, setReadMoreBtn] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<Qna[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const navigate = useNavigate();

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

  const [x, setX] = useState<number>(0);
  const finalMessage: string =
    "Sweetheart, I wanted to write you a love letter. I know it’s a little silly, but I’d try anyway. It’s just that I feel so much when I’m with you that I try to put it in words so that you know how I feel about you. You are such a gift to me. Having you in my life is such a blessing.";

  const percetage: number = (x / 100) * finalMessage.length;

  const slicedMessage: string = finalMessage.slice(0, percetage);

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUsedAnswer(e.target.value);
  };

  const handleSubmit = (a: string) => {
    setUsedAnswer("");
    setCurrentIndex(currentIndex + 1);
    const inputAnswer = usedAnswer.toLowerCase().trim();
    if (inputAnswer === a) {
      setResult(result + 1);
      setX(x + 100 / data.length);
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          id: data[currentIndex].id,
          question: data[currentIndex].question,
          answer: data[currentIndex].answer,
        },
      ]);
    }
  };

  const readMore = () => {
    setReadMoreBtn(true);
    setIsVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
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
                <TextField
                  id="standard-basic"
                  label="Enter your answer"
                  variant="standard"
                  value={usedAnswer}
                  onChange={handleAnswer}
                  className="input"
                />
              </div>
              <Button
                click={() => handleSubmit(data[currentIndex].answer)}
                btnName="Submit"
              />
            </div>
          ) : (
            <>
              <div className="message">
                ❤️❤️
                {slicedMessage.length <= 0
                  ? "Sry, No message to display"
                  : slicedMessage}
                ❤️❤️
              </div>
              {slicedMessage.length < finalMessage.length ? (
                <>
                  {isVisible ? (
                    <div onClick={readMore}>
                      <Button click={readMore} btnName="Read More" />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {readMoreBtn ? (
                <div className="readMoreWrapper">
                  <div className="readMoreHeading">
                    <label>Answers You were wrong in</label>
                  </div>
                  {wrongAnswers?.map(({ id, question, answer }, index) => {
                    return (
                      <div key={index}>
                        <div className="readMoreQuestion">
                          <label>
                            {id}. {question}?
                          </label>
                        </div>
                        <div className="readMoreAnswer">
                          <label>
                            {" "}
                            <b>ans:</b> {answer}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
