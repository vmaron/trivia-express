import React, {Component} from 'react';
import MultiCard from '../MultiCard/MultiCard.component';
import axios from 'axios';
import classes from './FlashCard.module.css';
import {Flex, Link} from "rebass";
import {connect} from "react-redux";
import {NEXT_QUESTION, PREV_QUESTION} from "../../../store/actions/constants";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faEye} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'

library.add([faArrowLeft, faArrowRight, faEye]);

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
          {this.props.enableFlip && (
            <div className={classes.peek} title="Peek at answer">
              <FontAwesomeIcon icon="eye" onClick={e => this.flip(e)} size='2x'
                               color='var(--theme-ui-colors-primary,hsl(10,80%,50%))'/>
            </div>
          )}
          <div onClick={this.flipBack} className={`${classes.card} ${flipClass}`}>
            {flashCardDataLoaded && (<MultiCard  {...newCardProps} />)}
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

export default connect(mapStateToProps, dispatchToProps)(FlashCard);

