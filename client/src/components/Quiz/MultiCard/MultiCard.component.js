import React, {Fragment} from 'react';
import './MultiCard.css';

const MultiCard = (props) => {
  const {question, options, correctAnswer} = props.questionData[0];
  const questionOptions = options.map((option, i) => {
    return <li key={i} style={{display: 'block', textAlign: 'left'}}>({String.fromCharCode(i + 97)}) {option}</li>
  })
  const answerLetter = String.fromCharCode(options.indexOf(correctAnswer) + 97);

  return (
    <Fragment>
      <div className="card-back">
        <div className='card-back__question'>{question}</div>
        <ul className="multi">
          {questionOptions}
        </ul>
      </div>
      <div className="card-front">
        ({answerLetter}) {correctAnswer}
      </div>
    </Fragment>
  );
};

export default MultiCard;
