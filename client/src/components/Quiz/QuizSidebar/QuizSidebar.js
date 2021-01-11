import React from 'react';
import {
  getTotalCorrectSelector,
  getTotalIncorrectSelector,
  getTotalRemainingSelector
} from "../../../store/selectors/quiz";
import {connect} from "react-redux";
import {Box, Flex} from "rebass";
import classes from './QuizSidebar.module.css';

const QuizSidebar = (props) => (
  <Flex flexDirection='column'>
    <div className={classes.count}>
      <div> Remaining</div>
      <Box
        sx={{
          display: 'inline-block',
          bg: 'highlight',
          px: 2,
          py: 1,
          borderRadius: 9999,
        }}>
        {props.totalRemaining}
      </Box>
    </div>
    <div className={classes.count}>
      <div>Correct</div>
      <Box
        sx={{
          display: 'inline-block',
          color: 'green',
          bg: 'highlight',
          px: 2,
          py: 1,
          borderRadius: 9999,
        }}>
        {props.totalCorrect}
      </Box>
    </div>
    <div className={classes.count}>
      <div>Incorrect</div>
      <Box
        sx={{
          display: 'inline-block',
          color: 'primary',
          bg: 'highlight',
          px: 2,
          py: 1,
          borderRadius: 9999,
        }}>
        {props.totalIncorrect}
      </Box>
    </div>
  </Flex>
);

const mapStateToProps = state => ({
  totalCorrect: getTotalCorrectSelector(state),
  totalIncorrect: getTotalIncorrectSelector(state),
  totalRemaining: getTotalRemainingSelector(state)
});

export default connect(mapStateToProps, null)(QuizSidebar);
