// src/components/Footer.js

import React from "react";

function Footer() {
  return (
    <footer className="custom-footer text-white text-center py-3">
      <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

