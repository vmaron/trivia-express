import React, {Component} from 'react';
import {faDice, faDumbbell, faFileAlt, faFont, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {getNewQuiz} from '../../../store/actions/quiz'
import {library} from '@fortawesome/fontawesome-svg-core';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classes from "./MultiCards.module.css";
import {Text} from "rebass";
import MultiCard from "../MultiCard/MultiCard.component";

library.add(faDumbbell, faFont, faFileAlt, faDice, faSpinner);

class MultiCards extends Component {
  static propTypes = {
    quizId: PropTypes.number.isRequired,
    getNewQuiz: PropTypes.func.isRequired,
    quizName: PropTypes.string.isRequired,
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
      flashCardDataLoaded: false,
      enableFlip: false
    }
  }

  componentWillMount() {
    this.props.getNewQuiz(this.props.quizId);
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
    const {cardRequestTime, flashCardDataLoaded, enableFlip} = this.state;
    const flashCardProps = {cardRequestTime, flashCardDataLoaded};

    return (
      <div className={classes.container}>
        <Text
          style={{marginBottom: '2rem'}}
          fontSize={[ 3, 4 ]}
          fontWeight='bold'>
          General Knowledge - {this.props.quizName}
        </Text>
        {this.props.currentQuestion && (
          <MultiCard {...flashCardProps} nowReady={this.nowReady} notReady={this.notReady} enableFlip={enableFlip}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizName: state.quiz.name,
  currentQuestion: state.quiz.currentQuestion,
  questions: state.quiz.questions
})

const dispatchToProps = (dispatch) => ({
  getNewQuiz: (id) => dispatch(getNewQuiz(id))
})

export default connect(mapStateToProps, dispatchToProps)(MultiCards);

