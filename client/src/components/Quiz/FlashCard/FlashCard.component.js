import React, {Component} from 'react';
import MultiCard from '../MultiCard/MultiCard.component';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './FlashCard.css';

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.apiHostRoot = `http://localhost:5000/api/v1/questions/random/1`;
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

  newCard = async () => {
    const {notReady, nowReady} = this.props;
    notReady();

    let newCardInfo = await axios.get(this.apiHostRoot);
    this.setState({
      flipClass: '',
      questionData: {...newCardInfo.data}
    }, () => nowReady());
  }

  componentDidMount() {
    this.newCard();
  }

  componentDidUpdate(prevProps, prevState) {
    const {cardRequestTime} = this.props;
    if (prevProps.cardRequestTime !== cardRequestTime) {
      this.newCard();
    }
  }

  render() {
    const {flipClass, questionData} = this.state;
    const {flashCardDataLoaded} = this.props;
    const newCardProps = {questionData};

    if (!flashCardDataLoaded) {
      return (
        <div className="spinner-wrapper">
          <FontAwesomeIcon icon='spinner' size='6x' spin/>
        </div>
      )
    }

    return (
      <div className="flashcard-with-button">
        <div className="row align-items-center card-holder">
          <div onClick={this.flip} className={`col-sm-6 offset-sm-3 card mb-3 ${flipClass}`}>
            <MultiCard  {...newCardProps} />
          </div>
        </div>
        <div onClick={this.newCard} className="btn btn-primary btn-lg">Next Question</div>
      </div>
    );
  }
}

export default FlashCard;
