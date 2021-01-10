import React from 'react';
import Navbar from "../components/Common/Nav/Navbar";

const Layout = ({children}) => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="layout">
        <div className="layout-body">
          <main className="layout-content">
            {children}
          </main>
          <nav className="layout-nav">
            Navigation
          </nav>
          <aside className="layout-ads">
            Advertisements
          </aside>
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
