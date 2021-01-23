import React from 'react';
import axios from 'axios';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import QuizQuestions from "../components/Quiz/QuizQuestions/QuizQuestions";

class ReviewQuestions extends React.Component {

  state = {
    questions: [], quizName: '', quizId: this.props.match.params.quizId
  }

  async componentDidMount() {
    const quizId = this.props.match.params.quizId;
    const url = `/api/v1/quiz/${quizId}`;
    const resp = await axios.get(url)
    this.setState({
      quizId: quizId,
      quizName: resp.data.name,
      questions: resp.data.questions
    })
  }

  render() {
    return (
      <TripleColumnsLayout
        center={<QuizQuestions
          questions={this.state.questions}
          quizName={this.state.quizName}
          quizId={this.state.quizId}/>}
      />
    );
  }
}


export default ReviewQuestions;
