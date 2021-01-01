import React, {Fragment} from 'react';
import classes from "./MultiCard.module.css";
import {SUBMIT_QUESTION} from "../../../store/actions/constants";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(faCheck);

class MultiCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: this.props.currentQuestion.response
    };
  }

  render() {
    const {question, options, correctAnswer} = this.props.questionData[0];
    const answerLetter = String.fromCharCode(options.indexOf(correctAnswer) + 97);

    return (
      <Fragment>
        <div className={classes.cardBack}>
          <div className={classes.cardBackQuestion}>{question}</div>
          <ul className={classes.options}>
            {options.map((option, i) => {
              const letter = String.fromCharCode(i + 97);
              if (this.state.response !== letter) {
                return (<li key={i} className={classes.option} onClick={this.handleOptionClicked(letter, answerLetter)}>
                  <span className={classes.letter}>&nbsp;</span> ({letter}) {option}
                </li>)
              } else {
                const responseClass = letter !== answerLetter ? classes.incorrect : classes.correct;
                return (<li key={i} className={classes.option} onClick={this.handleOptionClicked(letter, answerLetter)}>
                  <span className={responseClass}><FontAwesomeIcon icon="check"/></span> ({letter}) {option}
                </li>)
              }
            })}
          </ul>
        </div>
        <div className={classes.cardFront}>
          ({answerLetter}) {correctAnswer}
        </div>
      </Fragment>
    );
  }

  handleOptionClicked(letter, answerLetter) {
    return () => {
      const correct = letter === answerLetter;
      this.props.submitQuestion({
        ...this.props.currentQuestion,
        correct,
        incorrect: !correct,
        response: answerLetter
      });
      this.setState({response: letter})
    };
  }
}


const mapStateToProps = (state) => ({
  currentQuestion: state.quiz.currentQuestion
})


const dispatchToProps = (dispatch) => ({
  submitQuestion: (payload) => dispatch({type: SUBMIT_QUESTION, payload})
})

export default connect(mapStateToProps, dispatchToProps)(MultiCard);
