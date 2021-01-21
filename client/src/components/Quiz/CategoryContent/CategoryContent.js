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
    history.replace(`review/questions/${id}`);
  };

  return (
    <div>
      <h2 className={classes.heading}>General Knowledge</h2>
      <div className="paperSheet">
        <ul className={classes.list}>
          {categories.map(c =>
            <li className={classes.listItem} key={c.id}>
              <Link className={classes.clickable} onClick={() => redirect(c.id)}>{c.name}</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  categories: getCategoriesSelector(state)
});

const dispatchToProps = (dispatch) => ({
  loadCategoryContent: () => dispatch(getCategoryContent(1))
})

export default connect(mapStateToProps, dispatchToProps)(CategoryContent);

