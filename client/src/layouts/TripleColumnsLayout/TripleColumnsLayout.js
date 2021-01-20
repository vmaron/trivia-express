import React from 'react';
import Navbar from "../../components/Common/Nav/Navbar";
import classes from "./TripleColumnsLayout.module.css";

const TripleColumnsLayout = ({center, left, right}) => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className={classes.layout}>
        <div className={classes.body}>
          <main className={classes.content}>
            {center}
          </main>
          {left && (<nav className={classes.nav}>
            {left}
          </nav>)}
          {right && (<aside className={classes.ads}>
            {right}
          </aside>)}
        </div>
      </main>
      <footer>
        <div className="footer">
          Footer
        </div>
      </footer>
    </>
  )
}

export default TripleColumnsLayout;
