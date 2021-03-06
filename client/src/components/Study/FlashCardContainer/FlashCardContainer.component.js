import React, {Component} from 'react';
import axios from 'axios';
import classes from './FlashCardContainer.module.css';
import {Flex, Link} from "rebass";
import {connect} from "react-redux";
import {NEXT_QUESTION, PREV_QUESTION} from "../../../store/actions/constants";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faEye} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'
import FlashCard from "../FlashCard/FlashCard.component";

library.add([faArrowLeft, faArrowRight, faEye]);

class FlashCardContainer extends Component {
  static propTypes = {
    enableFlip: PropTypes.bool
  }
  static defaultProps = {
    enableFlip: false
  }

  constructor(props) {
    super(props);
    this.state = {
      flipClass: '',
      questionData: ''
    };
  }

  flip = e => {
    this.setState((prevState, props) => ({
      flipClass: prevState.flipClass === '' ? 'flip' : ''
    }));
  }

  flipBack = e => {
    if (this.state.flipClass === 'flip') {
      this.flip(e);
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

  prevCard = async () => {
    this.props.getPrevQuestion({...this.props.currentQuestion});
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

    return (
      <div className={classes.flashcardWithButton}>
        <div className={classes.cardHolder}>
          <div className={`${classes.card} ${flipClass}`} onClick={e => this.flip(e)}>
            {flashCardDataLoaded && (<FlashCard  {...newCardProps} />)}
          </div>
        </div>
        <Flex style={{marginTop: '30px'}}>
          <div className={classes.previous}>
            <Link onClick={this.prevCard} variant='nav' className={classes.clickable}>
              <FontAwesomeIcon icon="arrow-left"/> Previous
            </Link>
          </div>
          <div className={classes.next}>
            <Link onClick={this.nextCard} variant='nav' className={classes.clickable}>
              Next <FontAwesomeIcon icon="arrow-right"/>
            </Link>
          </div>
        </Flex>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentQuestion: state.quiz.currentQuestion
  }
}

const dispatchToProps = (dispatch) => ({
  getPrevQuestion: (payload) => dispatch({type: PREV_QUESTION, payload}),
  getNextQuestion: (payload) => dispatch({type: NEXT_QUESTION, payload}),
})

export default connect(mapStateToProps, dispatchToProps)(FlashCardContainer);

