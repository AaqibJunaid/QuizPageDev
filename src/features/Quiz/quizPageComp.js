import React, { Component } from "react";
//Imports Style Sheets and Quiz Data
import { Quiz } from "./quizData.js";
import "./quizPage.css";

class QuizPage extends Component {
  constructor(props) {
    super(props);
    //Initalises the states that will be used
    this.state = {
      page: "Question", //page to be displayed
      button: "Next", //buttons text
      buttonActive: "", //which buttons selected
      questionNum: 0, //which question number you are currently on
      questions: Quiz.data, //data used for displaying the quiz
      score: 0, //users score
      resultMessage: "" //end result message
    };
  }

  //HTML Elements to be displayed for the Questions Page
  questionPage() {
    //calls the renderButtons function with the current
    //question and answers list and returns on the
    //HTML Elements
    return this.renderButtons(
      //retrives the questions data from the state questions and points to
      //the questionNumber in the array
      this.state.questions[this.state.questionNum].question,
      this.state.questions[this.state.questionNum].answers
    );
  }

  //HTML Elements to be displayed for the result page
  resultPage() {
    //returns the end results message
    return <h1 id="results">{this.state.resultMessage}</h1>;
  }

  //Changes the color of the auestion tab when a user
  //clicks on it
  updateTab(tab) {
    this.setState({ buttonActive: tab });
  }

  //function handles button submissions
  submit() {
    //intialises variables
    let newScore = this.state.score;
    let questionNumber = this.state.questionNum;
    let nextButton = this.state.button;

    //checks if button is clicked
    //if the buttons not clicked user is
    //prompted a message sating please select
    //an answer
    if (
      this.state.buttonActive == "" &&
      (this.state.page == "Question" || this.state.page == "Finish")
    ) {
      alert("Please Select an Answer");
    }
    //if the button is clicked then a check is
    //made to see if it was the next button
    //that was clicked

    //if that is the case a check is made to see
    //if the users selected value is the correct one
    //if so 1 is addedto the users score
    else if (this.state.button == "Next") {
      if (
        this.state.buttonActive ==
        this.state.questions[this.state.questionNum].correctAnswer
      ) {
        newScore = this.state.score + 1;
      }
      //if the user is on the last question
      //the button is changed to finish
      if (this.state.questionNum + 1 == this.state.questions.length - 1) {
        nextButton = "Finish";
        //question number is plus oned to get the
        //next set of questions and answers
        questionNumber++;
      } else {
        //question number is plus oned to get the
        //next set of questions and answers
        questionNumber++;
      }
      //chnages the state values accordingly
      this.setState({
        score: newScore,
        button: nextButton,
        questionNum: questionNumber,
        buttonActive: ""
      });
      //if the button clicked was finish
      //a check is made to see if the users
      //answer was correct and then
      //sets the end message to tell
      //the user their score
    } else if (this.state.button == "Finish") {
      if (
        this.state.buttonActive ==
        this.state.questions[this.state.questionNum].correctAnswer
      ) {
        newScore = this.state.score + 1;
      }
      //message created bassed of user score
      let message =
        "You Scored " +
        newScore.toString() +
        " out of " +
        this.state.questions.length.toString();
      //states updated accordingly
      this.setState({
        score: newScore,
        page: "Results",
        button: "Retry",
        questionNum: 0,
        buttonActive: "",
        resultMessage: message
      });
      //else if none of the other buttons match
      //this means the user wantes to resest the
      //quiz and will revert back to the
      //original state
    } else {
      this.setState({
        score: 0,
        button: "Next",
        questionNum: 0,
        page: "Question"
      });
    }
  }

  renderButtons(question, answers) {
    let buttons = [];
    //a question button is generated
    //dynamically based upon the amount of
    //answers a question has
    for (let i = 0; i < answers.length; i++) {
      //pushs each question button into an array
      buttons.push(
        <button
          key={i}
          className="questionButton"
          id={this.state.buttonActive === answers[i] ? "navButtonActive" : null}
          onClick={() => this.updateTab(answers[i])}
        >
          {answers[i]}
        </button>
      );
    }

    //div is made which will contain the question
    //and possible answers
    let output = (
      <div className="questionBox">
        <h1 className="question">{question}</h1>
        <div id="buttons">{buttons}</div>
      </div>
    );

    return output;
  }

  //render function will display all the HTML
  //Elements based of the page the user is on
  //The function calls will run the respected
  //functions and return the HTML Elements and
  //display it
  render() {
    return (
      <div id="mainPage">
        <div id="mainPageBody">
          <div id="contentPanel">
            <h2 id="quizTitle">Quiz</h2>
            {this.state.page === "Question"
              ? this.questionPage()
              : this.state.page === "Results"
              ? this.resultPage()
              : this.state.page}
            <button id="submit" onClick={() => this.submit()}>
              {this.state.button}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizPage;
