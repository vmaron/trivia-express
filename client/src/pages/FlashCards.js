import React, {Component} from 'react';
import FlashCard from "../components/Quiz/FlashCard/FlashCard.component";
import './FlashCards.css';
import {faDice, faDumbbell, faFileAlt, faFont, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faDumbbell, faFont, faFileAlt, faDice, faSpinner);

class FlashCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardRequestTime: Date.now(),
      flashCardDataLoaded: false
    }
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
      <div className='container'>
        <FlashCard {...flashCardProps} nowReady={this.nowReady} notReady={this.notReady}/>
      </div>
    );
  }
}

export default FlashCards;
