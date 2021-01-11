import React from 'react';
import Layout from "../layouts/Layout";
import FlashCards from "../components/Quiz/FlashCards/FlashCards";
import QuizSidebar from "../components/Quiz/QuizSidebar/QuizSidebar";
import GoogleAds from "../components/Advertising/GoogleAds";

const Quiz = () => (
  <Layout
    left={<QuizSidebar/>}
    center={<FlashCards/>}
    right={<GoogleAds/>}
  />
);

export default Quiz;
