// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Application</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;
