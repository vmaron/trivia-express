import React from 'react';
import PropTypes from 'prop-types';
import classes from "./QuizQuestions.module.css";
import {useHistory} from "react-router-dom";
import {Flex, Link, Text} from "rebass";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const QuizQuestions = ({quizId, questions, quizName}) => {
  let history = useHistory();

  const options = [
    {value: 0, label: 'Multiple Choice Quiz'},
    {value: 1, label: 'Flashcards'}
  ];

  const handleCancel = () => {
    history.replace(`/`);
  }

  const onSelect = (option) => {
    if (option.value === 0) {
      history.replace(`/multiple-choice-quiz/${quizId}`);
    }
    else if (option.value === 1) {
      history.replace(`/flash-cards/${quizId}`);
    }
  }

  return (
    <div>
      <div className={classes.heading}>

        <Text
          fontSize={[3, 4, 5]}
          fontWeight='bold'>
          General Knowledge - {quizName}
        </Text>

        <Flex alignItems={'center'} justifyContent={'center'}>
          <div className={classes.clickable}>
            <Dropdown options={options} onChange={onSelect} placeholder="Start" className='Dropdown'/>
          </div>
          <div className={classes.clickable}>
            <Link variant='nav' onClick={handleCancel}>Cancel</Link>
          </div>
        </Flex>
      </div>
      <div className="paperSheet">
        <ol className={classes.questions}>
          {questions.map(c =>
            <li className={classes.item} key={c.id}>
              <div className={classes.question}>{c.question}</div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

QuizQuestions.propTypes = {
  quizId: PropTypes.string.isRequired,
  quizName: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuizQuestions;
