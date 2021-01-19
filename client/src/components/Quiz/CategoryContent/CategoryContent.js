import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from "rebass";
import {useHistory} from "react-router-dom";
import classes from './CategoryContent.module.css';
import {getCategoryContent} from "../../../store/actions/category";
import {getCategoriesSelector} from "../../../store/selectors/category";

const CategoryContent = ({categories, loadCategoryContent = f => f}) => {
  let history = useHistory();
  useEffect(() => {
    loadCategoryContent();
  }, [loadCategoryContent]);

  const redirect = id => {
    history.replace(`quizzes/${id}`);
  };

  return (<>
    {categories.map(c => {
      return <div key={c.id} className={classes.clickableItem}>
        <Link className={classes.clickable} onClick={() => redirect(c.id)}>{c.name}</Link>
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

