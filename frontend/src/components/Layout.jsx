import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

function Layout({ children }) {
  const location = useLocation();

  // Define routes where Footer should be hidden
  const hideFooterRoutes = [];

  // Determine whether to show the footer
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="layout">
      <div className="scroll-bar"></div>

      {/* Background */}
      <div className="background-container"></div>

      {/* Page Content */}
      <div className="content">{children}</div>

      {/* Footer (conditionally shown) */}
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default Layout;
