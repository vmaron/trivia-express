import React, {Fragment} from 'react';
import classes from "./MultiCard.module.css";
import {SUBMIT_QUESTION} from "../../../store/actions/constants";
import {connect} from "react-redux";

const MultiCard = (props) => {
  const {question, options, correctAnswer} = props.questionData[0];
  const answerLetter = String.fromCharCode(options.indexOf(correctAnswer) + 97);

  const questionOptions = options.map((option, i) => {
    return <li key={i} className={classes.option} onClick={() => {
      const correct = String.fromCharCode(i + 97) === answerLetter;
      props.submitQuestion({...props.currentQuestion, correct, incorrect: !correct});
    }}>
      ({String.fromCharCode(i + 97)}) {option}
    </li>
  })

  return (
    <Fragment>
      <div className={classes.cardBack}>
        <div className={classes.cardBackQuestion}>{question}</div>
        <ul className={classes.options}>
          {questionOptions}
        </ul>
      </div>
      <div className={classes.cardFront}>
        ({answerLetter}) {correctAnswer}
      </div>
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  currentQuestion: state.quiz.currentQuestion
})


const dispatchToProps = (dispatch) => ({
  submitQuestion: (payload) => dispatch({type: SUBMIT_QUESTION, payload})
})

export default connect(mapStateToProps, dispatchToProps)(MultiCard);
