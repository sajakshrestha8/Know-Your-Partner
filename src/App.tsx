/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import Button from "./Components/Button/Button";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

interface Qna {
  id: number;
  question: string;
  answer: string;
}

interface IQuestion {
  Question: string;
}
const App = () => {
  const [usedAnswer, setUsedAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [readMoreBtn, setReadMoreBtn] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<Qna[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const navigate = useNavigate();
  const URL = "http://localhost:8080";
  const token = localStorage.getItem("token");

  const [data, setData] = useState<IQuestion[]>([]);

  const getQuestion = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/answerer/getquestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data);
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          navigate("/login");
          localStorage.clear();
        }
      }
    }
  }, [token, navigate]);

  const [x, setX] = useState<number>(0);
  const finalMessage: string =
    "Sweetheart, I wanted to write you a love letter. I know it’s a little silly, but I’d try anyway. It’s just that I feel so much when I’m with you that I try to put it in words so that you know how I feel about you. You are such a gift to me. Having you in my life is such a blessing.";

  const percetage: number = (x / 100) * finalMessage.length;

  const slicedMessage: string = finalMessage.slice(0, percetage);

  const handleAnswer = (event: string, i: number) => {
    console.log(event);
    console.log(i);
  };

  const handleSubmit = () => {
    // setUsedAnswer("");
    // setCurrentIndex(currentIndex + 1);
    // const inputAnswer = usedAnswer.toLowerCase().trim();
    // if (inputAnswer === a) {
    //   setResult(result + 1);
    //   setX(x + 100 / data.length);
    // } else {
    //   setWrongAnswers([
    //     ...wrongAnswers,
    //     {
    //       id: data[currentIndex].id,
    //       question: data[currentIndex].question,
    //       answer: data[currentIndex].answer,
    //     },
    //   ]);
    // }

    // try {
    //   axios.post(`${URL}/answerer/checkAnswer`, {
    //     answer:
    //   });
    // } catch (error) {

    // }

    console.log("Yesma paxi submit hunxa");
  };

  const readMore = () => {
    setReadMoreBtn(true);
    setIsVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  console.log(data);

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
          <form action="" onSubmit={handleSubmit}>
            {data?.map((value, index) => {
              return (
                <>
                  <div key={index} className="qnaWrapper">
                    <div className="question">
                      <div>{value.Question} ?</div>
                    </div>
                    <div>
                      <TextField
                        id="standard-basic"
                        label="Enter your answer"
                        variant="standard"
                        value={usedAnswer}
                        onChange={(e) => handleAnswer(e.target.value, index)}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                </>
              );
            })}
            <Button btnName="Submit" />
          </form>
          {/* {currentIndex < data.length ? (
                <label>
                  {`${data[currentIndex].id}. ${data[currentIndex].question}`}?
                </label>
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default App;
