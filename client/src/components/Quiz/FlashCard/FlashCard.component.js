import React, {Component} from 'react';
import MultiCard from '../MultiCard/MultiCard.component';
import axios from 'axios';
import classes from './FlashCard.module.css';
import Spinner from "../../Common/Spinner/Spinner";
import {Button, Flex} from "rebass";
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

    if (!flashCardDataLoaded) {
      return (<Spinner/>)
    }

    return (
      <div className={classes.flashcardWithButton}>
        <div className={classes.cardHolder}>
          {this.props.enableFlip && (<Flex justifyContent='flex-end'>
            <div className={classes.peek}>
              <FontAwesomeIcon icon="eye" size='2x' color='var(--theme-ui-colors-primary,hsl(10,80%,50%))' onClick={e => this.flip(e)}/>
            </div>
          </Flex>)}
          <div onClick={this.flipBack} className={`${classes.card} ${flipClass}`}>
            <MultiCard  {...newCardProps} />
          </div>
        </div>
        <Flex style={{marginTop: '30px'}}>
          <div className={classes.previous}>
            <Button onClick={this.prevCard} variant='primary' className={classes.clickable}>
              <FontAwesomeIcon icon="arrow-left"/> Previous</Button>
          </div>
          <div className={classes.next}>
            <Button onClick={this.nextCard} variant='primary' className={classes.clickable}>
              Next <FontAwesomeIcon icon="arrow-right"/></Button>
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

