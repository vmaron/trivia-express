import React from 'react';
import Navbar from "../components/Common/Nav/Navbar";

const Layout = (props) => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="layout">
        <div className="layout-body">
          <main className="layout-content">
            {props.center}
          </main>
          {props.left && (<nav className="layout-nav">
            {props.left}
          </nav>)}
          {props.right && (<aside className="layout-ads">
            {props.right}
          </aside>)}
        </div>
      </main>
      <footer className="layout-footer">
        <div className="footer">
          Footer
        </div>
      </footer>
    </>
  )
}

export default Layout;
