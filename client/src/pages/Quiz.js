import React, {useEffect, useState} from 'react';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import FlashCards from "../components/Quiz/FlashCards/FlashCards";
import QuizSidebar from "../components/Quiz/QuizSidebar/QuizSidebar";
import GoogleAds from "../components/Advertising/GoogleAds";
import {useParams} from "react-router-dom";

const Quiz = () => {
  let {id} = useParams();
  const [quizId, setQuizId] = useState(0);
  useEffect(() => {
    setQuizId(parseInt(id));
  }, [id]);


  return (
    <>
      {quizId > 0 && (<TripleColumnsLayout
        left={<QuizSidebar/>}
        center={<FlashCards quizId={quizId}/>}
        right={<GoogleAds/>}
      />)}
    </>
  );
}

export default Quiz;
