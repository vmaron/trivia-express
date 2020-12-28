import React, {Component} from 'react';
import MultiCard from '../MultiCard/MultiCard.component';
import axios from 'axios';
import './FlashCard.css';
import Spinner from "../../Common/Spinner/Spinner";
import {Button} from "rebass";

class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.apiHost = `${process.env.REACT_APP_API_URL}/v1/questions/random/1`;
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

    let newCardInfo = await axios.get(this.apiHost);
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
      return (<Spinner/>)
    }

    return (
      <div className="flashcard-with-button">
        <div className="card-holder">
          <div onClick={this.flip} className={`card ${flipClass}`}>
            <MultiCard  {...newCardProps} />
          </div>
        </div>
        <Button onClick={this.newCard} variant='primary'>Next Question</Button>
      </div>
    );
  }
}

export default FlashCard;
