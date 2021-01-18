import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Link as RebassLink} from "rebass";
import {Link as RouterLink} from "react-router-dom";
import {getCategoryContent} from "../../../store/actions/category";
import {getCategoriesSelector} from "../../../store/selectors/category";

const CategoryContent = ({categories, loadCategoryContent = f => f}) => {
  useEffect(() => {
    loadCategoryContent();
  }, [loadCategoryContent]);

  return (<>
    {categories.map(c => {
      return <div key={c.id}>
        <RebassLink variant='nav' as={RouterLink} to={`quizzes/${c.id}`}>{c.name}</RebassLink>
      </div>
    })}
  </>);
}

const mapStateToProps = state => ({
  categories: getCategoriesSelector(state)
});

const dispatchToProps = (dispatch) => ({
  loadCategoryContent: () => dispatch(getCategoryContent(1))
})

export default connect(mapStateToProps, dispatchToProps)(CategoryContent);

