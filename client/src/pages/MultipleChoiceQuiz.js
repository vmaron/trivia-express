import React, {useEffect, useState} from 'react';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import QuizSidebar from "../components/Quiz/QuizSidebar/QuizSidebar";
import GoogleAds from "../components/Advertising/GoogleAds";
import {useParams} from "react-router-dom";
import MultiCards from "../components/MultipleChoice/MultiCards/MultiCards";

const MultipleChoiceQuiz = () => {
  let {id} = useParams();
  const [quizId, setQuizId] = useState(0);
  useEffect(() => {
    setQuizId(parseInt(id));
  }, [id]);


  return (
    <>
      {quizId > 0 && (<TripleColumnsLayout
        left={<QuizSidebar/>}
        center={<MultiCards quizId={quizId}/>}
        right={<GoogleAds/>}
      />)}
    </>
  );
}

export default MultipleChoiceQuiz;
