import React from 'react';
import Navbar from "../components/Common/Nav/Navbar";

const Layout = ({ center, left, right }) => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="layout">
        <div className="layout-body">
          <main className="layout-content">
            {center}
          </main>
          {left && (<nav className="layout-nav">
            {left}
          </nav>)}
          {right && (<aside className="layout-ads">
            {right}
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
