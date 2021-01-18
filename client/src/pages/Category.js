import React from 'react';
import Layout from "../layouts/Layout";
import GoogleAds from "../components/Advertising/GoogleAds";
import CategoryContent from "../components/Quiz/CategoryContent/CategoryContent";
import QuizQuestions from "../components/Quiz/QuizQuestions/QuizQuestions";

const Category = (props) => (
  <Layout
    left={<CategoryContent/>}
    center={<QuizQuestions/>}
    right={<GoogleAds/>}
  />
);

export default Category;
