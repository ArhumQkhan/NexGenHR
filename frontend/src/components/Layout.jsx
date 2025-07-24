import React from "react";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="scroll-bar"></div>

      {/* Single Background Image */}
      <div className="background-container"></div>

      {/* Page Content */}
      <div className="content">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
