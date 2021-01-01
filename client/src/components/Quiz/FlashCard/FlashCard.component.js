import React, {Component} from 'react';
import MultiCard from '../MultiCard/MultiCard.component';
import axios from 'axios';
import './FlashCard.css';
import Spinner from "../../Common/Spinner/Spinner";
import {Button} from "rebass";
import {connect} from "react-redux";
import {NEXT_QUESTION} from "../../../store/actions/constants";
import PropTypes from "prop-types";

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipClass: '',
      questionData: ''
    };
  }

  static propTypes = {
    enableFlip: PropTypes.bool
  }

  static defaultProps = {
    enableFlip: false
  }

  flip = e => {
    if (this.props.enableFlip) {
      this.setState((prevState, props) => ({
        flipClass: prevState.flipClass === '' ? 'flip' : ''
      }));
    }
  }

  newCard = async () => {
    const {notReady, nowReady} = this.props;
    notReady();

    let newCardInfo = await axios.get(`/api/v1/questions/${this.props.currentQuestion.id}`);
    this.setState({
      flipClass: '',
      questionData: {...newCardInfo.data}
    }, () => nowReady());
  }

  nextCard = async () => {
    this.props.getNextQuestion({...this.props.currentQuestion});
  }

  componentDidMount() {
    this.newCard();
  }

  componentDidUpdate(prevProps, prevState) {
    const {cardRequestTime, currentQuestion} = this.props;
    if (prevProps.cardRequestTime !== cardRequestTime || prevProps.currentQuestion.id !== currentQuestion.id) {
      this.newCard();
    }
  }

  render() {
    const {flipClass, questionData} = this.state;
    const {flashCardDataLoaded} = this.props;
    const newCardProps = {questionData};

    if (!flashCardDataLoaded) {
      return (<Spinner/>)
    }

    return (
      <div className="flashcard-with-button">
        <div className="card-holder">
          <div onClick={this.flip} className={`card ${flipClass}`}>
            <MultiCard  {...newCardProps} />
          </div>
        </div>
        <Button onClick={this.nextCard} variant='primary'>Next Question</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.quiz.currentQuestion
})

const dispatchToProps = (dispatch) => ({
  getNextQuestion: (payload) => dispatch({type: NEXT_QUESTION, payload})
})

export default connect(mapStateToProps, dispatchToProps)(FlashCard);

