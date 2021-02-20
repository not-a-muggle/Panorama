import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
<div className="container">
 <a className="navbar-brand" href="#">PANORAMA</a>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>
 <div className="collapse navbar-collapse" id="navbarResponsive">
   <ul className="navbar-nav ml-auto">
     <li className="nav-item">
     <Link to="/SignIn" className = "nav-link">Sign In </Link>
     </li>
     <li className="nav-item">
     <Link to="/SignUp" className = "nav-link"> Sign Up </Link>
     </li>
</ul>
 </div>
</div>
</nav>
      
     
    </div>
  );
};

export default Navbar;