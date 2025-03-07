const App = () => {
  const data: object[] = [
    {
      question: "test question",
      answer: "test answer",
    },
  ];
  console.log(data);

  return (
    <>
      <h1>Know Your partner</h1>
      {data?.map(({ question, answer }, index) => {
        return (
          <>
            <label key={index}>{answer}</label>
            <label key={index}>{question}</label>
          </>
        );
      })}
    </>
  );
};

export default App;
