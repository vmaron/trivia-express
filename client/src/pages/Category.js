import React from 'react';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import CategoryContent from "../components/Quiz/CategoryContent/CategoryContent";

const Category = (props) => (
  <TripleColumnsLayout
    center={<CategoryContent/>}
  />
);

export default Category;
