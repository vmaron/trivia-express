import React, {Fragment} from 'react';
import classes from "./FlashCard.module.css";
import {connect} from "react-redux";
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'

library.add(faCheck);

class FlashCard extends React.Component {
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
        </div>
        <div className={classes.cardFront}>
          ({answerLetter}) {correctAnswer}
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  currentQuestion: state.quiz.currentQuestion
})


export default connect(mapStateToProps, null)(FlashCard);
