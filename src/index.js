import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./features/Quiz/quizPage";

const rootElement = document.getElementById("root");
ReactDOM.render(<MainPage />, rootElement);
module.hot.accept();
