import React from 'react';
import PropTypes from 'prop-types';
import classes from "./QuizQuestions.module.css";
import {useHistory} from "react-router-dom";
import {Button, Flex, Link, Text} from "rebass";

const QuizQuestions = ({quizId, questions, quizName}) => {
  let history = useHistory();

  const handleTakeQuiz = () => {
    history.replace(`/quiz/${quizId}`);
  }

  const handleCancel = () => {
    history.replace(`/`);
  }

  return (
    <div>
      <div className={classes.heading}>

        <Text
          fontSize={[ 3, 4, 5 ]}
          fontWeight='bold'>
          General Knowledge - {quizName}
        </Text>

        <Flex alignItems={'center'} justifyContent={'center'}>
          <div className={classes.clickable}>
            <Button onClick={handleTakeQuiz} variant='primary'>Take the Quiz</Button>
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
