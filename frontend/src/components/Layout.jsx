import React from "react";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="layout">
      
      <div className="background-container"></div>

      
      <div className="content">{children}</div>

      
      <Footer />
    </div>
  );
}

export default Layout;
