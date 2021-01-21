import React from 'react';
import PropTypes from 'prop-types';
import classes from "./QuizQuestions.module.css";
import {useHistory} from "react-router-dom";

const QuizQuestions = ({quizId, questions}) => {
  let history = useHistory();

  const redirect = id => {
    history.replace(`/quiz/${quizId}`);
  };

  return (
    <div>
      <h2 className={classes.heading}>General Knowledge</h2>
      <div className="paperSheet">
        <ol className={classes.questions}>
          {questions.map(c =>
            <li className={classes.item} key={c.id}>
              <div className={classes.question} onClick={() => redirect(c.id)}>{c.question}</div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

QuizQuestions.propTypes = {
  quizId: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuizQuestions;
