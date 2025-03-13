/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";

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

  const [x, setX] = useState<number>(0) ;
  const finalMessage: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const percetage: number = (x / 100) * finalMessage.length;

  const slicedMessage: string = finalMessage.slice(0, percetage);
  console.log(slicedMessage)

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUsedAnswer(e.target.value);
  };

  const handleSubmit = (a: string) => {
    setUsedAnswer("");
    setCurrentIndex(currentIndex + 1);
    const inputAnswer = usedAnswer.toLowerCase();
    if (inputAnswer === a) {
      setResult(result + 1);
      setX(x + (100/data.length));
    }
  };

  const readMore = () => {
    setReadMoreBtn(true);
  }

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
                <TextField
                  id="standard-basic"
                  label="Enter your answer"
                  variant="standard"
                  value={usedAnswer}
                  onChange={handleAnswer}
                  className="input"
                />
              </div>
              <div className="button">
                <button onClick={() => handleSubmit(data[currentIndex].answer)}>
                  Submit
                </button>
              </div>
            </div>
          ) :
              <>
                <div className="message">❤️❤️{slicedMessage.length <=0 ? "Sry, No message to display" : slicedMessage}❤️❤️</div>
                {slicedMessage.length < 5 ? <div className="readMore"><button onClick={readMore}>Read More</button></div> : ""}
                {readMoreBtn ?
                 <>
                  <label>You can Retry for your wrong answers</label>
                  {data?.map(({question}, index) => {
                    return(
                      <div key={index}>
                        <label>{question}</label>
                      </div>
                    )
                  })}
                 </> 
                 : ""}
              </>
          }
        </div>
      </div>
    </>
  );
};

export default App;
