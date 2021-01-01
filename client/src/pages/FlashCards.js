import React, {Component} from 'react';
import FlashCard from "../components/Quiz/FlashCard/FlashCard.component";
import {faDice, faDumbbell, faFileAlt, faFont, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {getNewQuiz} from '../store/actions/quiz'
import {library} from '@fortawesome/fontawesome-svg-core';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classes from "./FlashCards.module.css";

library.add(faDumbbell, faFont, faFileAlt, faDice, faSpinner);

class FlashCards extends Component {
  static propTypes = {
    getNewQuiz: PropTypes.func.isRequired,
    currentQuestion: PropTypes.object,
    questions: PropTypes.array.isRequired
  }

  static defaultProps = {
    questions: [],
    currentQuestion: null
  }

  constructor(props) {
    super(props);
    this.state = {
      cardRequestTime: Date.now(),
      flashCardDataLoaded: false
    }
  }

  componentWillMount() {
    if (this.props.questions.length === 0)
      this.props.getNewQuiz();
  }

  notReady = () => {
    this.setState({
      flashCardDataLoaded: false
    });
  }

  nowReady = () => {
    this.setState({
      flashCardDataLoaded: true
    });
  }

  render() {
    const {cardRequestTime, flashCardDataLoaded} = this.state;
    const flashCardProps = {cardRequestTime, flashCardDataLoaded};

    return (
      <div className={classes.container}>
        {this.props.currentQuestion && (
          <FlashCard {...flashCardProps} nowReady={this.nowReady} notReady={this.notReady}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.quiz.currentQuestion,
  questions: state.quiz.questions
})

const dispatchToProps = (dispatch) => ({
  getNewQuiz: () => dispatch(getNewQuiz())
})

export default connect(mapStateToProps, dispatchToProps)(FlashCards);

