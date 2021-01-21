import React from 'react';
import axios from 'axios';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import QuizQuestions from "../components/Quiz/QuizQuestions/QuizQuestions";

class ReviewQuestions extends React.Component {

  state = {
    questions: []
  }

  async componentDidMount() {
    const quizId = this.props.match.params.quizId;
    const url = `/api/v1/quiz/${quizId}`;
    const resp = await axios.get(url)
    this.setState({
      quizId: quizId,
      questions: resp.data
    })
  }

  render() {
    return (
      <TripleColumnsLayout
        center={<QuizQuestions
          questions={this.state.questions}
          quizId={this.state.quizId}/>}
      />
    );
  }
}


export default ReviewQuestions;
